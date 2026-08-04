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
    const activePatients = await this.appointmentModel.db.model('Patient')
      .find({ isDeleted: { $ne: true } })
      .select('_id')
      .lean()
      .exec();
    const activePatientIds = activePatients.map(p => p._id);

    return this.appointmentModel
      .find({ patient: { $in: activePatientIds } })
      .populate('patient')
      .populate('doctor')
      .lean()
      .exec();
  }

  async create(appointmentData: any): Promise<any> {
    const createdAppointment = new this.appointmentModel(appointmentData);
    const saved = await createdAppointment.save();
    return this.appointmentModel
      .findById(saved._id)
      .populate('patient')
      .populate('doctor')
      .exec();
  }

  async updateStatus(id: string, status: string): Promise<Appointment | null> {
    return this.appointmentModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .populate('patient')
      .populate('doctor')
      .lean()
      .exec();
  }

  async search(query: any): Promise<{ data: Appointment[], total: number, page: number, totalPages: number }> {
    const { page = 1, limit = 10, q, startDate, endDate, doctor, treatment, status } = query;
    const skip = (Number(page) - 1) * Number(limit);

    const activePatients = await this.appointmentModel.db.model('Patient')
      .find({ isDeleted: { $ne: true } })
      .select('_id')
      .lean()
      .exec();
    const activePatientIds = activePatients.map(p => p._id);

    const filter: any = {
      patient: { $in: activePatientIds }
    };

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        filter.createdAt.$gte = start;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }

    if (doctor) {
      filter.doctor = doctor;
    }

    if (treatment) {
      filter.treatmentCategory = { $regex: treatment, $options: 'i' };
    }

    if (status) {
      filter.status = status;
    }

    if (q) {
       const patients = await this.appointmentModel.db.model('Patient')
         .find({ name: { $regex: q, $options: 'i' }, isDeleted: { $ne: true } })
         .select('_id')
         .lean()
         .exec();
       const patientIds = patients.map(p => p._id);
       
       const doctors = await this.appointmentModel.db.model('Doctor')
         .find({ name: { $regex: q, $options: 'i' }, isDeleted: { $ne: true } })
         .select('_id')
         .lean()
         .exec();
       const doctorIds = doctors.map(d => d._id);

       filter.$or = [
         { patient: { $in: patientIds } },
         { doctor: { $in: doctorIds } },
         { treatmentCategory: { $regex: q, $options: 'i' } }
       ];
    }

    const total = await this.appointmentModel.countDocuments(filter).exec();
    const data = await this.appointmentModel.find(filter)
      .populate('patient')
      .populate('doctor')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean()
      .exec();

    return {
      data,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit))
    };
  }
}
