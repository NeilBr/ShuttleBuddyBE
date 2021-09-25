
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from './entities/route.entity';
import { RouteSchedule } from '../route-schedule/entities/routeSchedule.entity';
import {Client} from "@googlemaps/google-maps-services-js";
import { MapsKey } from 'src/auth/consts';
import { Location } from 'src/locations/entities/location.entity';
import * as moment from 'moment';

@Injectable()
export class RoutesService {

  constructor(
  @InjectRepository(Route)
  private routeRepository: Repository<Route>, 
  @InjectRepository(RouteSchedule)
  private routeStopRepository: Repository<RouteSchedule>,
  @InjectRepository(Location)
  private locationRepository: Repository<Location>, 
  ){}
  
  async create(createRouteDto: any) {
    const newRoute = await this.routeRepository.save(createRouteDto.route);
    await this.getRouteStopsFromRoute(createRouteDto.stops, newRoute.id, newRoute);
    return newRoute;
  }

  async findAll() {
    return await this.routeRepository.find();
  }

  findOne(id: number) {
    return this.routeRepository.findOne(id);
  }

  async update(updateRouteDto: any) {
    const updatedRoute = await this.routeRepository.save(updateRouteDto.route);
    this.getRouteStopsFromRoute(updateRouteDto.stops, updateRouteDto.route.id, updateRouteDto)
    return updatedRoute;
  }

  remove(id: number) {
    return this.routeRepository.delete(id);
  }

  async getRouteStopsFromRoute(routeStops: any[], routeID: number, route: Route){

    const allRouteStops = [];
    
    const locationsOnRoute = await this.getLocationsOnRoute(route);
    
    let lastStop = null;
    let index = 0;
    for (const stop of routeStops) {
      if(lastStop){   
        const durations = await this.getDurationOfTrips(lastStop, route, locationsOnRoute, index);        
        const newTimes = await this.getEstimatedTimes(lastStop.estTime, durations);        
        const routeStop = {
          estTime: newTimes,
          routeID,
          locationID: stop.locationID ,
        }  as RouteSchedule;
        
        allRouteStops.push(routeStop);
        lastStop = routeStop;
      } else {
        
        const routeStop = {
          estTime: route.startTimes,
          routeID,
          locationID: stop.locationID ,
        }  as RouteSchedule;
        console.log(index, JSON.stringify(routeStop));

        allRouteStops.push(routeStop);

        lastStop = routeStop;

      }
      if(index === routeStops.length - 1){
        await this.routeStopRepository.save(allRouteStops);
      }
      index += 1;
    }
    
  }

  async getRouteWithIDs(){
    const routes = await this.routeRepository.find();
    const routeID = [];

    await routes.forEach(route => {
      routeID.push(route.id);
    });
    return {
      routes: routes,
      ids: routeID
    };
  }

  getEstimatedTimes(lastStopTimes, durations){
    let curEstimatedTimes = '';
    lastStopTimes.split(',').forEach((time, index) => {
      curEstimatedTimes = curEstimatedTimes === ''? 
          curEstimatedTimes + (moment(time,'HH:mm:ss').add(+durations[index],'s').format('HH:mm:ss')): curEstimatedTimes + ',' + (moment(time,'HH:mm:ss').add(+durations[index],'s').format('HH:mm:ss')); 
    });
    return curEstimatedTimes;
  }

  async getLocationsOnRoute(route){
    const getLocationsOnRoute = await this.locationRepository.findByIds(JSON.parse(route.routeStops), {});
    const locationsOnRoute = []
    await JSON.parse(route.routeStops).forEach(stop => {
      getLocationsOnRoute.forEach(location =>{
        if(stop === location.id){
          locationsOnRoute.push(location);
        }
      });
    });
    return locationsOnRoute;
  }

  async getDurationOfTrips(lastStop, route, locationsOnRoute, index){
    const client = new Client({});
    const durations = [];
    const lastStopTimes = lastStop.estTime.split(',');
     for(const i in route.startTimes.split(',')){    
        const curStartDate = await moment(lastStopTimes[i],'HH:mm:ss').add(24, 'h').toDate();
        const curDuration = await (client.distancematrix({
          params: {
            origins: [
              {
                lat: +locationsOnRoute[index - 1].latitude,
                lng: +locationsOnRoute[index - 1].longitude
              }
            ],
            destinations: [{
              lat: +locationsOnRoute[index].latitude,
              lng: +locationsOnRoute[index].longitude
            }],
            departure_time: curStartDate,
            key: MapsKey
          },
          timeout: 2000
        })).then(result =>{
          return result.data.rows[0].elements[0].duration.value;
        })
        durations.push(curDuration);
    }
    return durations;
  }
}
