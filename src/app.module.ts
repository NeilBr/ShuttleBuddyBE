import { Module } from '@nestjs/common';
import { Connection, getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { RoutesModule } from './routes/routes.module';
import { LocationsModule } from './locations/locations.module';
import { ShuttlesModule } from './shuttles/shuttles.module';
import { MapsSessionGateway } from './maps-session/maps.session.gateway';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    RoutesModule,
    LocationsModule,
    ShuttlesModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, MapsSessionGateway],
})
export class AppModule {
  constructor(private readonly connection: Connection){
    connection.synchronize();
  }
}
