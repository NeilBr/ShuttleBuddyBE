import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShuttlesService } from './shuttles.service';
import { CreateShuttleDto } from './dto/create-shuttle.dto';
import { UpdateShuttleDto } from './dto/update-shuttle.dto';

@Controller('shuttles')
export class ShuttlesController {
  constructor(private readonly shuttlesService: ShuttlesService) {}

  @Post()
  create(@Body() createShuttleDto: CreateShuttleDto) {
    return this.shuttlesService.create(createShuttleDto);
  }

  @Get()
  findAll() {
    return this.shuttlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shuttlesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShuttleDto: UpdateShuttleDto) {
    return this.shuttlesService.update(+id, updateShuttleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shuttlesService.remove(+id);
  }
}
