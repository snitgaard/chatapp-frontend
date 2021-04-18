import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {StockValue} from '../shared/stock.model';
import {Subscription} from 'rxjs';
import {ListenForStocks, LoadStockFromStorage, UpdateStocks} from './stock.actions';
import {StockService} from '../shared/stock.service';

export interface StockStateModel {
  stocks: StockValue[];
}

@State<StockStateModel>({
  name: 'stock',
  defaults: {
    stocks: [],
  }
})
@Injectable()
export class StockState {
  constructor(private stockService: StockService) {
  }
  private stocksUnsub: Subscription | undefined;
  @Selector()
  static stocks(state: StockStateModel): StockValue[] {
    return state.stocks;
  }
  @Action(ListenForStocks)
  getStocks(ctx: StateContext<StockStateModel>) {
    this.stocksUnsub = this.stockService.listenForStocks().subscribe(stocks => {
      ctx.dispatch(new UpdateStocks(stocks));
    })
  }
  @Action(UpdateStocks)
  updateStocks(ctx: StateContext<StockStateModel>, us: UpdateStocks): void {
    // Old state Object...
    // {
    //     chatClients: [
    //       //    {id: '33', nickname: 'bob'},
    //       //    {id: '22', nickname: 'dd'}
    //     //    ],
    //     chatClient: {id: '2', nickname: 'd'}
    //   }
    const state = ctx.getState();
    const newState: StockStateModel = {
      ...state,
      stocks: us.stocks
    };
    ctx.setState(newState);
  }
}
