import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  
  constructor( @InjectRepository(User) private repository: Repository<User> ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
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

  update(updateUserDto: UpdateUserDto) {
    return this.repository.save(updateUserDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
