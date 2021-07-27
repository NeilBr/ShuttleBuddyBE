import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Shuttle {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  registration: string;

  @ApiProperty()
  @Column()
  size: number;
  
  @ApiProperty()
  @Column()
  assignedRoute: number;
  
}
