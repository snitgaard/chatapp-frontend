import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {Observable, Subject, Subscription} from 'rxjs';
import {debounceTime, map, take, takeUntil} from 'rxjs/operators';
import {StockService} from './shared/stock.service';
import {StockValue} from './shared/stock.model';

@Component({
  selector: 'app-chat',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit, OnDestroy {
  stockFC = this.fb.group({
    stockName: [''],
    initValue: [''],
    currentValue: [''],
    description: ['']
  });
  unsubscribe$ = new Subject();
  stockCreate: StockValue | undefined;
  error: string | undefined;
  constructor(private stockService: StockService, private fb: FormBuilder) { }

  ngOnInit(): void {
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
}
