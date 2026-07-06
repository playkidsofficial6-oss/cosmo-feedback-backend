import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from './schemas/patient.schema';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) { }



  async findAll(): Promise<Patient[]> {
    return this.patientModel.find().lean().exec();
  }

  async findOne(id: string): Promise<Patient | null> {
    return this.patientModel.findById(id).lean().exec();
  }

  async create(patientData: any): Promise<PatientDocument> {
    const createdPatient = new this.patientModel(patientData);
    return createdPatient.save();
  }

  async update(id: string, updateData: any): Promise<Patient | null> {
    return this.patientModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .lean()
      .exec();
  }


}
