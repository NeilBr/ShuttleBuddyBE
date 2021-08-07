import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Route } from './entities/route.entity';

@Injectable()
export class RoutesService {

  constructor(@InjectRepository(Route)
  private routeRepository: Repository<Route>){}
  
  async create(createRouteDto: CreateRouteDto) {
    return await this.routeRepository.save(createRouteDto);
  }

  async findAll() {
    return await this.routeRepository.find();
  }

  findOne(id: number) {
    return this.routeRepository.findOne(id);
  }

  async update(updateRouteDto: Route) {
    return await this.routeRepository.save(updateRouteDto);
  }

  remove(id: number) {
    return this.routeRepository.delete(id);
  }
}
