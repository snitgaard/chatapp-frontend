import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';
import {StockComponent} from './stock.component';
import {StockRoutingModule} from './stock-routing.module';


@NgModule({
  declarations: [StockComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    ReactiveFormsModule
  ]
})
export class StockModule { }
