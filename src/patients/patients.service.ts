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
    const lastPatient = await this.patientModel.findOne().sort({ pid: -1 }).exec();
    const nextPid = lastPatient && lastPatient.pid ? lastPatient.pid + 1 : 1;
    const createdPatient = new this.patientModel({ ...patientData, pid: nextPid });
    return createdPatient.save();
  }

  async update(id: string, updateData: any): Promise<Patient | null> {
    return this.patientModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .lean()
      .exec();
  }


}
