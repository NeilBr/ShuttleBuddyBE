import { Injectable } from '@nestjs/common';
import { CreateShuttleDto } from './dto/create-shuttle.dto';
import { UpdateShuttleDto } from './dto/update-shuttle.dto';

@Injectable()
export class ShuttlesService {
  create(createShuttleDto: CreateShuttleDto) {
    return 'This action adds a new shuttle';
  }

  findAll() {
    return `This action returns all shuttles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shuttle`;
  }

  update(id: number, updateShuttleDto: UpdateShuttleDto) {
    return `This action updates a #${id} shuttle`;
  }

  remove(id: number) {
    return `This action removes a #${id} shuttle`;
  }
}
