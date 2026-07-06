import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import * as mongoose from 'mongoose';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema({ timestamps: true, versionKey: false })
export class Appointment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true })
  patient: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true })
  doctor: mongoose.Types.ObjectId;

  @Prop({ required: true })
  treatmentCategory: string;

  @Prop({ required: true, default: 'Scheduled' })
  status: string;

  @Prop({ type: String, default: null })
  notes: string | null;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
