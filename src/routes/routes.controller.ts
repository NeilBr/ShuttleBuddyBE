import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { ScheduleService } from '../route-schedule/schedule.service';

@Controller('routes')
export class RoutesController {
  constructor(
    private readonly routesService: RoutesService,
    private readonly scheduleService: ScheduleService
    ) {}

  @Post()
  create(@Body() createRouteDto: any) {
    return this.routesService.create(createRouteDto);
  }

  @Get()
  findAll() {
    return this.routesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRouteDto: any) {
    console.log(updateRouteDto);
    return this.routesService.update(updateRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routesService.remove(+id);
  }

  
  @Get('schedule/all')
  findAllSchedules() {
    return this.scheduleService.getAllSchedules();
  }

  @Get('schedule/list')
  async findAllSchedulesForList() {
    const routesWithIDs = await this.routesService.getRouteWithIDs();
    return this.scheduleService.getAllSchedulesForList(routesWithIDs);
  }

  @Get('schedule/:id')
  async findAllSchedulesForRoute(@Param('id') id: string) {
    
    const route = await this.routesService.findOne(+id);

    const routesForReturn = {
      routes: [route],
      ids: [route.id]
    };
    return this.scheduleService.getAllSchedulesForList(routesForReturn).then(result => {
      return result.routes[0];
    });
  }

}
