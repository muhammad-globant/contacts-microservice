import { CustomLoggerService } from '../shared/custom-logger.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Contact } from './contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    private readonly logger: CustomLoggerService,
  ) {}

  async createContact(createContactDto: CreateContactDto): Promise<Contact> {
    try {
      const contact = this.contactRepository.create(createContactDto);
      const result = await this.contactRepository.save(contact);

      this.logger.log('New contact created successfully');
      return result;
    } catch (error) {
      this.logger.error('Failed to create contact', error.stack);
      throw error;
    }
  }
}
