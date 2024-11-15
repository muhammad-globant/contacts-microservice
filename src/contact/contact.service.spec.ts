import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Contact } from './contact.entity';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { CustomLoggerService } from '../shared/custom-logger.service';
import { Interest } from './contact.entity';

describe('ContactService', () => {
  let service: ContactService;
  let repository: Repository<Contact>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        CustomLoggerService,
        {
          provide: getRepositoryToken(Contact),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ContactService>(ContactService);
    repository = module.get<Repository<Contact>>(getRepositoryToken(Contact));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a contact', async () => {
    const createContactDto: CreateContactDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      message: 'This is a message.',
      interest: Interest.Sales,
    };

    const contact = new Contact();
    Object.assign(contact, createContactDto);

    jest.spyOn(repository, 'create').mockResolvedValue(contact as never);
    jest.spyOn(repository, 'save').mockResolvedValue(contact);

    expect(await service.createContact(createContactDto)).toEqual(contact);
  });
});
