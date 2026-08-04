import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { DoctorsModule } from './doctors/doctors.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://cosmo:Cosmo321@cosmo-feedback.utepw6b.mongodb.net/?appName=cosmo-feedback'),
    UsersModule,
    AuthModule,
    PatientsModule,
    AppointmentsModule,
    DoctorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
