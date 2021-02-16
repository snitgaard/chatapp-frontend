import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {ChatClient} from './chat-client.model';
import {ChatMessage} from './chat-message.model';
import {WelcomeDto} from './welcome.dto';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatClient: ChatClient | undefined;

  constructor(private socket: Socket) { }

  //From frontend to backend with emit
  sendMessage(msg: string){
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

  sendName(name: string) {
    this.socket.emit("name", name);
  }

  disconnect(): void {
    this.socket.disconnect();
  }

  connect(): void {
    this.socket.connect();
  }

}
