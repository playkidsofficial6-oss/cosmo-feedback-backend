import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  async findAll() {
    const appointments = await this.appointmentsService.findAll();
    return appointments.map((a) => ({ ...a, id: (a as any)._id.toString() }));
  }

  @Post()
  async create(@Body() createAppointmentDto: any) {
    const a = await this.appointmentsService.create(createAppointmentDto);
    return { ...a.toObject(), id: (a as any)._id.toString() };
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    const a = await this.appointmentsService.updateStatus(id, status);
    if (!a) throw new Error('Appointment not found');
    return { ...a, id: (a as any)._id.toString() };
  }
}
