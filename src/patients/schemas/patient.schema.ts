import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PatientDocument = HydratedDocument<Patient>;

@Schema({ timestamps: true, versionKey: false })
export class Patient {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, required: false, default: null })
  phone: string | null;

  @Prop({ required: true })
  patientType: string; // 'First Time Visitor', 'Returning Patient', etc.

  @Prop({ type: String, default: null })
  photoUrl: string | null;

  @Prop({ required: true })
  reviewStatus: string; // 'Pending', 'Yes', 'Declined'

  @Prop({ type: Number, default: null })
  reviewStars: number | null;

  @Prop({ type: String, default: null })
  reviewNotes: string | null;

  @Prop({ type: String, default: null })
  marketingSource: string | null;

  @Prop({ required: true })
  purchaseStatus: string;

  @Prop({ type: [String], default: [] })
  vipTags: string[];

  @Prop({ type: String, default: null })
  quickNotes: string | null;

  @Prop({ type: String, default: null })
  firstName: string | null;

  @Prop({ type: String, default: null })
  lastName: string | null;

  @Prop({ type: String, default: null })
  email: string | null;

  @Prop({ type: String, default: null })
  gender: string | null;

  @Prop({ type: String, default: null })
  age: string | null;

  @Prop({ type: String, default: null })
  streetAddress1: string | null;

  @Prop({ type: String, default: null })
  streetAddress2: string | null;

  @Prop({ type: String, default: 'Nilambur' })
  city: string;

  @Prop({ type: String, default: null })
  state: string | null;

  @Prop({ type: String, default: null })
  postalCode: string | null;

  @Prop({ type: String, default: 'India' })
  country: string;

  @Prop({ type: String, default: null })
  note: string | null;

  @Prop({ type: Number, unique: true })
  pid: number;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
