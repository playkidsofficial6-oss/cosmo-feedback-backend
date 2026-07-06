import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/cosmo-feedback'),
    UsersModule,
    AuthModule,
    PatientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
