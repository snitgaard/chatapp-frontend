import {StockValue} from './stock.model';

export interface StockDTO {
  stocks: StockValue[];
  stock: StockValue;
}
