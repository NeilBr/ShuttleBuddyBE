import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  
  constructor( @InjectRepository(User) private repository: Repository<User> ) {}

  async create(user: any) {
    return await this.repository.save(user);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.repository.findOne({username: username});
  }

  findOneByID(id: number) {
    return this.repository.findOne({id: id});
  }

  update(user: any) {
    return this.repository.save(user);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
