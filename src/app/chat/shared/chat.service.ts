import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ChatClient} from './chat-client.model';
import {ChatMessage} from './chat-message.model';
import {WelcomeDto} from './welcome.dto';
import {map} from 'rxjs/operators';
import {SocketChat} from '../../app.module';
import {SendMessageDto} from './send-message.dto';
import {JoinChatDto} from './join-chat.dto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: SocketChat) { }

  //From frontend to backend with emit
  sendMessage(msg: SendMessageDto){
    this.socket.emit("message", msg);
  }
  sendTyping(typing: boolean): void {
    this.socket.emit('typing', typing);
  }

  // Frontend is listening for backend events
  listenForMessages(): Observable<ChatMessage> {
    return this.socket
      .fromEvent<ChatMessage>("newMessage")
  }

  listenForClients(): Observable<ChatClient[]> {
    return this.socket
      .fromEvent<ChatClient[]>("clients")
  }

  listenForWelcome(): Observable<WelcomeDto> {
    return this.socket
      .fromEvent<WelcomeDto>("welcome")
  }

  listenForClientTyping(): Observable<ChatClient> {
    return this.socket
      .fromEvent<ChatClient>("clientTyping")
  }

  listenForError(): Observable<string> {
    return this.socket
      .fromEvent<string>("error");
  }

  getAllMessages(): Observable<ChatMessage[]> {
    return this.socket
      .fromEvent<ChatMessage[]>("allMessages")
  }

  joinChat(dto: JoinChatDto): void {
    this.socket.emit("joinChat", dto);
  }

  listenForConnect(): Observable<string> {
    return this.socket
      .fromEvent<string>("connect")
      .pipe(
        map(() => {
        return this.socket.ioSocket.id;
    }))
  };
  listenForDisconnect(): Observable<string> {
    return this.socket
      .fromEvent<string>("disconnect")
      .pipe(
        map(() => {
          return this.socket.ioSocket.id;
        }))
  };

  disconnect(): void {
    this.socket.disconnect();
  }

  connect(): void {
    this.socket.connect();
  }

  connectClient(clientId: string): void{
    this.socket.emit('clientConnect', clientId);
  }
}
