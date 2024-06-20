import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { RentalsModule } from './rentals/rentals.module';
import { CustomersModule } from './customers/customers.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes the module global
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('DATABASE_HOST');
        const port = configService.get<number>('DATABASE_PORT');
        const username = configService.get<string>('DATABASE_USERNAME');
        const password = configService.get<string>('DATABASE_PASSWORD');
        const database = configService.get<string>('DATABASE_NAME');

        Logger.log(`Connecting to DB: ${host}:${port} as ${username}`);

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: [join(__dirname, '**/**.entity{.ts,.js}')],
          migrations: [join(__dirname, '**/migrations/*{.ts,.js}')],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    BooksModule,
    RentalsModule,
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
