import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from './schemas/patient.schema';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PatientsService implements OnModuleInit {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) {}

  async onModuleInit() {
    await this.seedPatients();
  }

  async seedPatients() {
    const count = await this.patientModel.countDocuments();
    if (count === 0) {
      const todayStr = new Date().toISOString().split('T')[0];
      const timeStr = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      const initialPatients = [
        {
          name: 'Priya Kapoor',
          phone: '+91 98765 43210',
          visitDate: todayStr,
          visitTime: timeStr,
          doctorName: 'Dr. Shah',
          treatmentCategory: 'Laser Hair Reduction',
          patientType: 'First Time Visitor',
          photoUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          reviewStatus: 'Pending',
          reviewStars: null,
          reviewNotes: null,
          marketingSource: null,
          treatmentInterest: ['Laser Hair Reduction', 'Skin Rejuvenation'],
          purchaseStatus: 'Consultation Only',
          vipTags: [],
          quickNotes: null,
        },
        {
          name: 'Rahul Verma',
          phone: '+91 98765 43211',
          visitDate: todayStr,
          visitTime: timeStr,
          doctorName: 'Dr. Reddy',
          treatmentCategory: 'Acne Treatment',
          patientType: 'Returning Patient',
          photoUrl:
            'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150',
          reviewStatus: 'Pending',
          reviewStars: null,
          reviewNotes: null,
          marketingSource: null,
          treatmentInterest: ['Acne Treatment'],
          purchaseStatus: 'In-Clinic Treatment',
          vipTags: [],
          quickNotes: null,
        },
        {
          name: 'Ananya Singh',
          phone: '+91 98765 43212',
          visitDate: todayStr,
          visitTime: timeStr,
          doctorName: 'Dr. Shah',
          treatmentCategory: 'Anti-Aging',
          patientType: 'VIP',
          photoUrl:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          reviewStatus: 'Yes',
          reviewStars: 5,
          reviewNotes: 'Great service!',
          marketingSource: null,
          treatmentInterest: ['Anti-Aging', 'Fillers'],
          purchaseStatus: 'Package Purchased',
          vipTags: ['VIP'],
          quickNotes: null,
        },
      ];
      for (const p of initialPatients) {
        await this.patientModel.create(p);
      }
    }
  }

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

  async resetDatabase(): Promise<Patient[]> {
    await this.patientModel.deleteMany({});
    await this.seedPatients();
    return this.findAll();
  }
}
