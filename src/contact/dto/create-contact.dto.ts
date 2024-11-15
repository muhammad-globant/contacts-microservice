import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Interest } from '../contact.entity';

export class CreateContactDto {
  @ApiProperty({ example: 'Muhammad', description: 'The first name of the contact' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Olimjonov', description: 'The last name of the contact' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'muhammad.olimjonov@example.com', description: 'The email address of the contact' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234567890', description: 'The phone number of the contact' })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'This is a message.', description: 'A message from the contact' })
  @IsNotEmpty()
  @IsString()
  @Length(10, 500)
  message: string;

  @ApiProperty({ enum: Interest, description: 'The interest category' })
  @IsEnum(Interest)
  interest: Interest;
}
