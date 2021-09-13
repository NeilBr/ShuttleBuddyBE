import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RouteSchedule } from './entities/routeSchedule.entity';

@Injectable()
export class ScheduleService {

  constructor(
  @InjectRepository(RouteSchedule)
  private repository: Repository<RouteSchedule>
  ){}

  async getAllSchedules() {
    return await this.repository.find();
  }
  
 
  async getScheduleForRoute( id: number) {
    return await this.repository.find({routeID: id});
  }
  
  async getAllSchedulesForList(routesWithIDs){
    
    const schedules = await this.repository.find(
      {
        where: {routeID: In(routesWithIDs.ids)},
      });
    
    routesWithIDs.routes.forEach(route => {
      route.schedule = [];
      schedules.forEach( schedule =>{
        if(schedule.routeID === route.id){
          route.schedule.push(schedule);
        }
      })
    });

    return routesWithIDs;
  }

}
