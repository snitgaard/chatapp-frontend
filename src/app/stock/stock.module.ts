import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';
import {StockComponent} from './stock.component';
import {StockRoutingModule} from './stock-routing.module';
import {NgxsModule} from '@ngxs/store';
import {StockState} from './state/stock.state';


@NgModule({
  declarations: [StockComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([StockState])
  ]
})
export class StockModule { }
