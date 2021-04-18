import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ChatService} from './shared/chat.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {debounceTime, map, take, takeUntil} from 'rxjs/operators';
import {ChatClient} from './shared/chat-client.model';
import {ChatMessage} from './shared/chat-message.model';
import {LoginService} from './shared/login.service';
import {SendMessageDto} from './shared/send-message.dto';
import {JoinChatDto} from './shared/join-chat.dto';
import {StockState} from '../stock/state/stock.state';
import {StockValue} from '../stock/shared/stock.model';
import {Select, Store} from '@ngxs/store';
import {ListenForStocks} from '../stock/state/stock.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  messageFc = new FormControl('');
  nameFC = new FormControl('');
  messages: ChatMessage[] = [];
  clientsTyping: ChatClient[] = [];
  unsubscribe$ = new Subject();
  clients$: Observable<ChatClient[]> | undefined;
  chatClient: ChatClient | undefined;
  error$: Observable<string> | undefined;
  socketId: string | undefined;
  constructor(private chatService: ChatService, private loginService: LoginService, private store: Store) { }

  ngOnInit(): void {
    this.clients$ = this.chatService.listenForClients();
    this.messageFc.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(500)
      )
      .subscribe((value) => this.chatService.sendTyping(value.length > 0));

    this.chatService.listenForMessages()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(message => {
        this.messages.push(message)
      });
    this.chatService.listenForClientTyping()
      .pipe(takeUntil(this.unsubscribe$)
      )
      .subscribe((chatClient) => {
        if(chatClient.typing && !this.clientsTyping.find((c) => c.id === chatClient.id)) {
          this.clientsTyping.push(chatClient);
        } else {
          this.clientsTyping = this.clientsTyping.filter((c) => c.id !== chatClient.id);
        }
      })

    this.chatService.listenForWelcome()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(welcome => {
        this.messages = welcome.messages;
        this.chatClient = welcome.client;
        this.loginService.saveChatClient(this.chatClient);
      })
    const oldClient = this.loginService.loadChatClient();
    if(oldClient) {
        this.chatService.joinChat({id: oldClient.id, name: oldClient.name});
      }
    this.chatService.listenForConnect()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((id) => {
        this.socketId = id;
      });

    this.chatService.listenForDisconnect()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((id) => {
         this.socketId = id
      });
    this.error$ = this.chatService.listenForError().pipe(takeUntil(this.unsubscribe$));
  }

  sendMessage(): void {
    /*this.chatService.sendMessage(this.messageFc.value);
    this.messageFc.patchValue('');*/

    console.log(this.messageFc.value);
    {
      if(this.chatClient)
      {
        const sendMsgDto: SendMessageDto = {
          chatClientId: this.chatClient.id,
          message: this.messageFc.value
        };
        this.chatService.sendMessage(sendMsgDto);
        this.messageFc.patchValue('');
      }
    }
  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  sendName(): void {
    if(this.nameFC.value)
    {
      console.log(this.chatClient?.id)
     const dto: JoinChatDto =  {name: this.nameFC.value};
      this.chatService.joinChat(dto);
    }
  }
}
