import { Injectable } from '@angular/core';;
import {StockValue} from './stock.model';
import {SocketStock} from '../../app.module';
import {StockDTO} from './stock.dto';
import {Observable} from 'rxjs';
import {JoinStockDto} from './join-stock.dto';

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

  listenForWelcome(): void {
    this.socket.emit("welcomeStock")
  }

  listenForStocks(): Observable<StockValue[]>
  {
    return this.socket
      .fromEvent<StockValue[]>("stocks")
  }
  joinStock(dto: JoinStockDto): void {
    this.socket.emit('joinStock', dto);
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
