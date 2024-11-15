import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Contact } from './contact.entity';
import { Interest } from './contact.entity';

describe('ContactController', () => {
  let controller: ContactController;
  let service: ContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'NOTIFICATION_SERVICE',
            transport: Transport.REDIS,
            options: {
              host: process.env.REDIS_HOST || 'localhost',
              port: parseInt(process.env.REDIS_PORT || '6379'),
            },
          },
        ]),
      ],
      controllers: [ContactController],
      providers: [
        {
          provide: ContactService,
          useValue: {
            createContact: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ContactController>(ContactController);
    service = module.get<ContactService>(ContactService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a contact', async () => {
    const createContactDto: CreateContactDto = {
      firstName: 'Muhammad',
      lastName: 'Olimjonov',
      email: 'muhammad.olimjonov@example.com',
      phoneNumber: '0987654321',
      message: 'Hello world!',
      interest: Interest.Partnerships,
    };

    const result: Contact = {
      ...createContactDto,
      id: 1,
    } as Contact;

    jest.spyOn(service, 'createContact').mockResolvedValue(result);

    expect(await controller.create(createContactDto)).toEqual(result);
  });
});
