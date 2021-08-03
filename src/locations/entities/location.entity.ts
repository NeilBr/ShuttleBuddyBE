import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Location {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  locationType: string;

  @ApiProperty()
  @Column()
  description: string;
  
  @ApiProperty()
  @Column()
  thumbnail: string;

  @ApiProperty()
  @Column()
  latitude: string;

  @ApiProperty()
  @Column()
  longitude: string;

}