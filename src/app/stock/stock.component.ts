import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {Observable, Subject, Subscription} from 'rxjs';
import {debounceTime, map, take, takeUntil} from 'rxjs/operators';
import {StockService} from './shared/stock.service';
import {StockValue} from './shared/stock.model';
import {ChatClient} from '../chat/shared/chat-client.model';
import {ChatMessage} from '../chat/shared/chat-message.model';
import {Select, Store} from '@ngxs/store';
import {StockState} from './state/stock.state';
import {ListenForStocks} from './state/stock.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit, OnDestroy {
  @Select(StockState.stocks) stocks$: Observable<StockValue[]> | undefined;
  stockFC = this.fb.group({
    stockName: [''],
    initValue: [''],
    currentValue: [''],
    description: ['']
  });
  unsubscribe$ = new Subject();
  stockCreate: StockValue | undefined;
  error: string | undefined;
  values: StockValue[] = [];
  selectedStock: StockValue | undefined;
  constructor(private stockService: StockService, private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new ListenForStocks());
    this.stockService.listenForWelcome();
    this.stocks$ = this.stockService.listenForStocks();
  }

  sendMessage(): void {
    console.log(this.stockFC.value);
  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  sendStock(): void {
    if (this.stockFC.value)
    {
      this.stockService.sendStock(this.stockFC.value);
      console.log(this.stockFC.value)
    }
  }

  onSelect(stock: StockValue) {
    this.selectedStock = stock;
  }

  onUpdate(currentValue: number): void
  {
    if(this.selectedStock !== undefined)
    {
      this.selectedStock.currentValue = currentValue;
    }
  }
}
