import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { DoctorsService } from './doctors.service';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @Post()
  create(@Body() createDoctorDto: { name: string; department?: string; specialization?: string }) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: { name?: string; department?: string; specialization?: string; isDeleted?: boolean }) {
    return this.doctorsService.update(id, updateDoctorDto);
  }
}
