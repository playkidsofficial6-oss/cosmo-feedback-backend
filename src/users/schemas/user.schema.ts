import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string; // plain text as requested

  @Prop({ required: true })
  role: string; // reception, manager, admin
}

export const UserSchema = SchemaFactory.createForClass(User);
