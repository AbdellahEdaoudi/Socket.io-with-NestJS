import { OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection',(client)=>{
      console.log(`client connected :  ${client.id}`);
    });
  }
  @SubscribeMessage('newSentMessage')
    newSentMessage(@MessageBody() message:string){
      this.server.emit('newSentMessage',message)
    }
    @SubscribeMessage('newSingleMessage')
    newSingelMessage(@MessageBody() data:{targetClientID:string,message:string}){
        // const targetClient = this.server.sockets.sockets.get(data.targetClientID);
        // targetClient.emit('newSingleMessage',data.message)
        this.server.to(data.targetClientID).emit('newSingleMessage',data.message)
    }
}
