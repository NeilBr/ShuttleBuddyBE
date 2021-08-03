import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {

  constructor( 
    @InjectRepository(Location)
    private locationRepository: Repository<Location>){}

  async create(createLocationDto: CreateLocationDto) {
    return await this.locationRepository.save(createLocationDto);
  }

  async findAll(): Promise<Location[]>{
    return await this.locationRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return this.locationRepository.delete(id);
  }
}
