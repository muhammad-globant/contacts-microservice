import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateContactDto } from '../src/contact/dto/create-contact.dto';
import { Interest } from '../src/contact/contact.entity';

describe('ContactController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/contact-us (POST) - success', () => {
    const createContactDto: CreateContactDto = {
      firstName: 'Bob',
      lastName: 'Jones',
      email: 'bob.jones@example.com',
      phoneNumber: '1234567890',
      message: 'Interested in partnerships.',
      interest: Interest.Partnerships,
    };

    return request(app.getHttpServer())
      .post('/contact-us')
      .send(createContactDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.firstName).toBe(createContactDto.firstName);
      });
  });
});
