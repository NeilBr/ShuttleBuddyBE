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
 @WebSocketGateway(4201, {namespace : 'maps-socket'})
 export class MapsSessionGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  attendees: any[];

  constructor(){
  }

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('undoAttendance')
  handleMessage(client: Socket, payload: string): void {
    const actives = JSON.parse(payload)
    this.server.emit('undoAttendance', payload);
  }


  @SubscribeMessage('studentAttended')
  markAsAttended(client: Socket, payload: string): void{
      const attend = JSON.parse(payload);
  }

  afterInit(server: Server) {
   this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
   this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
   this.logger.log(`Client connected: ${client.id}`);
   console.log('Current Clients', this.server.sockets.allSockets.length);
  }

 }