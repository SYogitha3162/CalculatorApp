import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './calculator/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CalculatorModule} from './calculator/calculator.module';

@NgModule({
  declarations: [
    AppComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalculatorModule,
    SharedModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
