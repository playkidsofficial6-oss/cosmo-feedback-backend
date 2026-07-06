import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async onModuleInit() {
    await this.seedUsers();
  }

  async seedUsers() {
    const usersToSeed = [
      { username: 'reception', password: '1234', role: 'reception' },
      { username: 'manager', password: '5678', role: 'manager' },
      { username: 'admin', password: '0000', role: 'admin' },
    ];

    for (const u of usersToSeed) {
      const exists = await this.userModel.findOne({ username: u.username });
      if (!exists) {
        await this.userModel.create(u);
      }
    }
  }

  async findOne(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).lean().exec();
  }
}
