import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Interest {
  Partnerships = 'Partnerships',
  PressAndMedia = 'Press and media',
  Sales = 'Sales',
  Events = 'Events',
  GeneralEnquiries = 'General enquiries',
}

@Entity()
export class Contact {
  @ApiProperty({ example: '1', description: 'The id of contact' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Muhammad', description: 'The first name of the contact' })
  @Column()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Olimjonov', description: 'The last name of the contact' })
  @Column()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'muhammad.olimjonov@example.com', description: 'The email address of the contact' })
  @Column()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234567890', description: 'The phone number of the contact' })
  @Column()
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'This is a message.', description: 'A message from the contact' })
  @Column()
  @IsNotEmpty()
  @IsString()
  @Length(10, 500)
  message: string;

  @ApiProperty({ enum: Interest, description: 'The interest category' })
  @Column({ type: 'enum', enum: Interest })
  @IsEnum(Interest)
  interest: Interest;
}
