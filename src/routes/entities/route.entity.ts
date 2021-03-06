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
  @Column("text")
  routeStops: string;

  @ApiProperty()
  @Column("text")
  pathPoints: string;

  @ApiProperty()
  @Column()
  dayOfTheWeek: string;

  @ApiProperty()
  @Column()
  startTimes: string;

  @ApiProperty()
  @Column()
  startLocationID: number;
  
  @ApiProperty()
  @Column()
  stopLocationID: number;

}
