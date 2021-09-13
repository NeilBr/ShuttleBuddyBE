import { Location } from 'src/locations/entities/location.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class RouteSchedule{
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  routeID: number;

  @OneToOne(type => Location,{
    createForeignKeyConstraints: false,
    eager: true
  } )
  @JoinColumn()
  locationID: number;

  @Column({type: 'time'})
  estTime: string;

  

}