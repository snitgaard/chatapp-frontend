import {Injectable, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Socket, SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment';
import {StockState} from './stock/state/stock.state';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Injectable()
export class SocketChat extends Socket {

  constructor() {
    super({url: 'http://localhost:3000', options: {}});
  }

}

@Injectable()
export class SocketStock extends Socket {

  constructor() {
    super({url: 'http://localhost:3100', options: {}});
  }

}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: StockState
    })
  ],
  providers: [SocketChat, SocketStock],
  bootstrap: [AppComponent]
})
export class AppModule {
}
