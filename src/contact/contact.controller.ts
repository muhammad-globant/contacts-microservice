import { Body, Controller, Post, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { Contact } from './contact.entity';

@ApiTags('contacts')
@Controller('contact-us')
export class ContactController {
  constructor(
    // example microservice: NOTIFICATION_SERVICE
    @Inject('NOTIFICATION_SERVICE') private readonly client: ClientProxy,
    private readonly contactService: ContactService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contact' })
  @ApiResponse({
    status: 201,
    description: 'The contact has been successfully created.',
    type: Contact,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createContactDto: CreateContactDto) {
    const createdUser = this.contactService.createContact(createContactDto);

    // Send email notification to the user
    const { email, firstName, lastName } = createContactDto;
    const message = `Thank you for contacting us, ${firstName} ${lastName}`;
    this.client.send('notify_user', { userId: email, message }).pipe(
      catchError((error) => {
        throw new RpcException(error.message);
      }),
    );

    return createdUser;
  }
}
