import { Injectable } from '@angular/core';;
import {StockValue} from './stock.model';
import {SocketStock} from '../../app.module';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  stockValue: StockValue | undefined;

  constructor(private socket: SocketStock) { }

  //From frontend to backend with emit
  sendStock(stock: StockValue){
    this.socket.emit("stock", stock);
  }
  /*
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
   */
}
