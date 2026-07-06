import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DoctorDocument = HydratedDocument<Doctor>;

@Schema({ timestamps: true, versionKey: false })
export class Doctor {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, default: '' })
  department: string;

  @Prop({ type: String, default: '' })
  specialization: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
