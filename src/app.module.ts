import { ClientsModule, Transport } from '@nestjs/microservices';
import { ContactModule } from './contact/contact.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { Contact } from './contact/contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Contact],
      synchronize: true,
    }),
    RedisModule.forRoot({ url: process.env.REDIS_URL, type: 'single' }),
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
    ContactModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
