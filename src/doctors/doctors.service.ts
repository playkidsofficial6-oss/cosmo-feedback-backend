import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from './schemas/doctor.schema';

@Injectable()
export class DoctorsService {
  constructor(@InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>) {}

  async findAll(): Promise<Doctor[]> {
    return this.doctorModel.find({ isDeleted: false }).exec();
  }

  async create(createDoctorDto: { name: string; department?: string; specialization?: string }): Promise<Doctor> {
    const createdDoctor = new this.doctorModel(createDoctorDto);
    return createdDoctor.save();
  }

  async update(id: string, updateDoctorDto: { name?: string; department?: string; specialization?: string; isDeleted?: boolean }): Promise<Doctor> {
    const updated = await this.doctorModel.findByIdAndUpdate(id, updateDoctorDto, { new: true });
    if (!updated) throw new NotFoundException('Doctor not found');
    return updated;
  }
}
