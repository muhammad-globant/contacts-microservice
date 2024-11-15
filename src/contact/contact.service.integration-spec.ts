import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contact.entity';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { ConfigModule } from '@nestjs/config';
import { Interest } from './contact.entity';

describe('ContactService (Integration)', () => {
  let service: ContactService;
  let repository: Repository<Contact>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'user',
          password: 'password',
          database: 'contacts_test',
          entities: [Contact],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Contact]),
      ],
      providers: [ContactService],
    }).compile();

    service = module.get<ContactService>(ContactService);
    repository = module.get<Repository<Contact>>(getRepositoryToken(Contact));
  });

  afterAll(async () => {
    await repository.clear();
  });

  it('should save a contact to the database', async () => {
    const createContactDto: CreateContactDto = {
      firstName: 'Muhamamd',
      lastName: 'Olimjonov',
      email: 'muhammad.olimjonov@example.com',
      phoneNumber: '1234567890',
      message: 'Hello, this is a test message.',
      interest: Interest.Events,
    };

    const contact = await service.createContact(createContactDto);
    expect(contact).toHaveProperty('id');
    expect(contact.firstName).toBe(createContactDto.firstName);
    expect(contact.interest).toBe(createContactDto.interest);
  });
});
