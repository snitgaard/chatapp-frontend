import {StockValue} from '../shared/stock.model';

export class ListenForStocks {
  static readonly type = '[Stocks] Listen For Stocks';
}
export class UpdateStocks {
  constructor(public stocks: StockValue[]) {}

  static readonly type = '[Stock] Update Stocks';
}
export class LoadStockFromStorage {
  static readonly type = '[Stock] Load Stock From Storage';
}
