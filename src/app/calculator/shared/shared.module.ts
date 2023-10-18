import { DisplayComponent } from './../display/display.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeypadComponent } from '../keypad/keypad.component';
import { HistoryComponent } from '../history/history.component';
import { HeaderComponent } from '../header/header.component';


@NgModule({
  declarations: [
    DisplayComponent,
    KeypadComponent,
    HistoryComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DisplayComponent,
    KeypadComponent,
    HistoryComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
