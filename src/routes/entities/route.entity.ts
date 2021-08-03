import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Route {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  routeStops: string;

  @ApiProperty()
  @Column()
  pathPoints: string;

  @ApiProperty()
  @Column()
  dayOfTheWeek: string;

  @ApiProperty()
  @Column()
  startLocationID: number;
  
  @ApiProperty()
  @Column()
  stopLocationID: number;

}
