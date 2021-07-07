import { ConvertorComponent } from './convertor/convertor.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { AppRouterModule } from './app-routing.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    ConvertorComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
