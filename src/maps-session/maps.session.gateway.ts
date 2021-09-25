import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
 } from '@nestjs/websockets';
 import { Logger } from '@nestjs/common';
 import { Socket, Server } from 'socket.io';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
 @WebSocketGateway(3001, {namespace: 'map-socket'})
 export class MapsSessionGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  users: number = 0;
  shuttleLocations = [] as any[];


  constructor(private schedulerRegistry: SchedulerRegistry){
    
  }

  @Cron('*/5 * * * * *', {
    name: 'sendLocationUpdates',
  })
  sendLocationUpdates() {
    this.server.emit('shuttleLocationUpdates', this.shuttleLocations);
  }

  @Cron('*/10 * * * * *', {
    name: 'checkShuttles',
  })
  checkShuttles() {
    this.shuttleLocations.forEach((shuttleLocation, index) => {
      if(shuttleLocation.clientID === null || shuttleLocation.clientID === undefined){
        this.shuttleLocations.splice(index);
      }
    });
  }


  OnGatewayInit(){
  }

  async handleConnection(client: Socket) {
    // A client has connected
    this.users++;
    // Notify connected clients of current users
    console.log('Connection #' + this.users, client.conn.id );
    this.server.emit('users', this.users);
    if(!this.schedulerRegistry.getCronJob('sendLocationUpdates')){
      this.sendLocationUpdates();
    }
  }

  async handleDisconnect(client: Socket) {
    // A client has disconnected
    --this.users;
    this.removeShuttle(client.id);
    // Notify connected clients of current users
    if(this.users === 0){
      // this.schedulerRegistry.getCronJob('sendLocationUpdates').stop();
      // this.schedulerRegistry.getCronJob('checkShuttles').stop();
    }
    this.server.emit('users', this.users);
  }

  
  @SubscribeMessage('chat')
  async onChat(client: Socket, payload: string) {
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('shuttleLocation')
  onGetLocation(client: Socket, payload: string) {
    // console.log(payload);
    this.addOrUpdateShuttleLocations(JSON.parse(payload));
    if(!this.schedulerRegistry.getCronJob('checkShuttles')){
      this.sendLocationUpdates();
    }
    // console.log(this.shuttleLocations);
  }

  addOrUpdateShuttleLocations(payload){
    let found = false;
    this.shuttleLocations.forEach((shuttleLocation) => {
      if(shuttleLocation.clientID === payload.clientID){
        found = true;
        shuttleLocation.position = payload.position;
      }
    });
    if(!found){
      this.shuttleLocations.push(payload);
    }
  }

  removeShuttle(payload){
    let found = false;
    this.shuttleLocations.forEach((shuttleLocation, index) => {
      if(shuttleLocation.clientID === payload){
        found = true;
        this.shuttleLocations.splice(index);
      }
    });
    if(!found){
      this.shuttleLocations.push(payload);
    }
  }

 }