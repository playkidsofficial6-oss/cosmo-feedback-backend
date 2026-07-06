import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel.find().populate('patient').populate('doctor').lean().exec();
  }

  async create(appointmentData: any): Promise<AppointmentDocument> {
    const createdAppointment = new this.appointmentModel(appointmentData);
    return createdAppointment.save();
  }

  async updateStatus(id: string, status: string): Promise<Appointment | null> {
    return this.appointmentModel.findByIdAndUpdate(id, { status }, { new: true }).lean().exec();
  }
}
