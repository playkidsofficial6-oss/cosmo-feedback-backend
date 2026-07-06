import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  async findAll() {
    // Transform _id to id for the frontend
    const patients = await this.patientsService.findAll();
    return patients.map((p) => ({ ...p, id: (p as any)._id.toString() }));
  }

  @Post()
  async create(@Body() createPatientDto: any) {
    const todayStr = new Date().toISOString().split('T')[0];
    const timeStr = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const p = await this.patientsService.create({
      ...createPatientDto,
      visitDate: todayStr,
      visitTime: timeStr,
    });
    return { ...p.toObject(), id: (p as any)._id.toString() };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePatientDto: any) {
    const p = await this.patientsService.update(id, updatePatientDto);
    if (!p) throw new NotFoundException('Patient not found');
    return { ...p, id: (p as any)._id.toString() };
  }

  @Post('reset')
  async reset() {
    const patients = await this.patientsService.resetDatabase();
    return patients.map((p) => ({ ...p, id: (p as any)._id.toString() }));
  }
}
