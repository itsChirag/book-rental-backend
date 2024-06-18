import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { RentalsModule } from './rentals/rentals.module';
import { CustomersModule } from './customers/customers.module';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'book-rental-dev',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      migrations: [join(__dirname, '**/migrations/*{.ts,.js}')],
      synchronize: true,
    }),
    BooksModule,
    RentalsModule,
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
