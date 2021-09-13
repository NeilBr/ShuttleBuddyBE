import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { RouteSchedule } from '../route-schedule/entities/routeSchedule.entity';
import { ScheduleService } from '../route-schedule/schedule.service';
import { HttpModule } from '@nestjs/axios';
import { Location } from 'src/locations/entities/location.entity';

@Module({
  controllers: [RoutesController],
  providers: [RoutesService, ScheduleService],
  imports: [TypeOrmModule.forFeature([Route, RouteSchedule, Location]),
            HttpModule],
  exports: [TypeOrmModule]
})
export class RoutesModule {}
