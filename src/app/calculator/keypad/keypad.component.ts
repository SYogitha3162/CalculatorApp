import { Component, Output,Input, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css']
  
})
export class KeypadComponent {
@Output() buttonClick: EventEmitter<string> = new EventEmitter<string>();
      /*array to hold buttons*/
      buttons: any[] =[
          { label: 'AC', value: 'clear', class: 'key symbol' },
          { label: 'M', value: 'M', class: 'key symbol' },
          { label: '%', value: '%', class: 'key symbol' },
          { label: '/', value: '/', class: 'key operator' },
          { label: '7', value: '7', class: 'key' },
          { label: '8', value: '8', class: 'key' },
          { label: '9', value: '9', class: 'key ' },
          { label: 'X', value: '*', class: 'key operator' },
          { label: '4', value: '4', class: 'key' },
          { label: '5', value: '5', class: 'key' },
          { label: '6', value: '6', class: 'key' },
          { label: '-', value: '-', class: 'key operator' },
          { label: '1', value: '1', class: 'key' },
          { label: '2', value: '2', class: 'key' },
          { label: '3', value: '3', class: 'key' },
          { label: '+', value: '+', class: 'key operator' },
          { label: '0', value: '0', class: 'key' },
          { label: '.', value: '.', class: 'key' },
          { label: '←', value: 'backspace', class: 'key icon' },
          { label: '=', value: '=', class: 'key operator' },
          { label: '', value: '', class: 'bar' }
        ];
      onButtonClick(value: string): void {
        this.buttonClick.emit(value);
      }
      
    }
    
  