import { Component ,ViewChild,ElementRef,AfterViewInit} from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
    /*refrencing child element using viewchild*/
      @ViewChild('keys') keys!: ElementRef;
      @ViewChild('displayInput') displayInput!: ElementRef;
      @ViewChild('displayOutput') displayOutput!: ElementRef;
      @ViewChild('historyDisplay') historyDisplay!: ElementRef;
    /*declaration of vriables*/
          input = '';
          memory: number | null = null;
          res = 0;
          existingHistory: any[] = [];
          history: string[] = [];
          currentInput="";
          constructor() {
            //Load history from localStorage on component initialization
            const existingHistoryString = localStorage.getItem('calculatorHistory');
            this.history = existingHistoryString ? JSON.parse(existingHistoryString) : [];
          }
          ngAfterViewInit(): void {
            const moon1 = document.getElementById("moon1");
            const sun1 = document.getElementById("sun1");
            moon1?.addEventListener("click", () => document.body.classList.toggle("dark-theme"));
            sun1?.addEventListener("click", () => document.body.classList.toggle("root"));
            this.setupEventListeners();
          
          }
        /*event lisnter attached on key element*/
          setupEventListeners(): void {
            const keysElement=this.keys?.nativeElement;
            if(keysElement){
              const keys = Array.from(this.keys.nativeElement.querySelectorAll('.key')) as HTMLElement[];
              for (const key of keys) {
                const value = key.dataset['key']; 
              // Add event listeners for button click//
              key.addEventListener('click', () => {
                if(value!==undefined)
                  this.onButtonClick(value);
  
              });
            }
          }
        }
        /*onbuttonclick function to perfrom diffrent operation*/
          onButtonClick(value: string) { 
            if (value === "clear") {
              this.clearInput();
              this.input = "";
              this.res=0;
              if (this.displayInput &&this.displayInput.nativeElement){
              this.displayInput.nativeElement.innerHTML = "";
              }
              if (this.displayOutput &&this.displayOutput.nativeElement){
              this.displayOutput.nativeElement.innerHTML = "0";
              }
            } else if (value === "backspace") {
              this.input = this.input.slice(0, -1);
              this.displayInput.nativeElement.innerHTML = this.finalInput(this.input);
            } else if (value === "=") {
              this.calculateResult(value);
              this.saveHistory();
              this.updateHistoryDisplay();
            } else if (value === "M") {
              this.savetomemory();
            } else {
              if (this.ValidateInput(value)) {
                this.currentInput+=value;
                this.input += value;
                if(this.displayInput && this.displayInput.nativeElement){
                this.displayInput.nativeElement.textContent = this.finalInput(this.input)
               
              }
            }}
          }
            
          calculateResult(val: string | undefined) {
              let operators: string[] = []; // Initialize the operators array
              let numbers: number[] = [];
              
              // Add "=" to the operators array only when "=" button is clicked
              if (val === "=") {
                operators.push("=");
              }
              
              let number = "";
              for (let char of this.input) {
                // isOperator is used to check character
                if (this.isOperator(char)) {
                  operators.push(char);
                  numbers.push(Number(number));
                  number = "";
                } else {
                  number += char;
                }
              }
              numbers.push(Number(number));
              let result = numbers[0];
              for (let i = 0; i < operators.length; i++) {
                const operator = operators[i];
                const operand = numbers[i + 1];
                switch (operator) {
                  case "+":
                    result += operand;
                    break;
            
                  case "-":
                    result -= operand;
                    break;
            
                  case "*":
                    result *= operand;
                    break;
            
                  case "/":
                    result /= operand;
                    break;
            
                  case "%":
                    result = (numbers[i] / 100) * operand;
                    break;
            
                  case "=":
                    result = new Function('return ' + this.input)();
                    const calculation = `${this.finalInput(this.input)}=${result}`;
                    this.history.push(calculation);
                    this.updateHistoryDisplay();
                    this.res = result;
                    break;
                }}
              if (!isNaN(result) && isFinite(result)) {
                  this.displayOutput.nativeElement.innerHTML = this.finalOutput(result);
                } else {
                  this.displayOutput.nativeElement.innerHTML = this.finalOutput(this.res);
              }
            }
            /*function for clearInput*/  
              clearInput() {
                  this.input = "";
                 if (this.displayInput &&this.displayInput.nativeElement){
                  this.displayInput.nativeElement.innerHTML = "";
                 }
                 if (this.displayOutput &&this.displayOutput.nativeElement){
                  this.displayOutput.nativeElement.innerHTML = "0";
                 }
                }
        /*isoperator to check valid char*/
          isOperator(char: any) {
            return ['+', '-', '*', '/', '%', '='].includes(char);
          }
          finalInput(input: string) {
            return input.replace(/(\*|\/|\+|\-|\%)/g, ' $1 ');
          }
        /*function for finaloutput*/
          finalOutput(output: number) {
            let output_string;
            if (Number.isFinite(output) && Math.abs(output) > 1e9) {
              output_string = output.toLocaleString('en', { maximumFractionDigits: 10 });
            } else {
              output_string = output.toString();
            }
            return output_string;
          }
        /*checking for valid operator*/
          ValidateInput(value: string | undefined) {
            let last_input = this.input.slice(-1);
            let operators = ["+", "-", "*", "/", "%"];
            if (value === "." && last_input === ".") {
              return false;
            }
            if (value && operators.includes(value)) {
              if (operators.includes(last_input)) {
                return false;
              } else {
                return true;
              }
            }
            return true;
          }
          /*save to memory function*/
          savetomemory() {
            if (this.input !== "") {
              const result = this.res;
              if (typeof result === "number" && Number.isFinite(result)) {
                this.memory = result;
                if (this.displayInput &&this.displayInput.nativeElement){
                this.displayInput.nativeElement.textContent = this.finalOutput(this.memory); // Use textContent instead of innerHTML
              }
              this.memoryStorage();
            }
            } else if (this.memory !== null) {
              this.input = this.memory.toString();
              if (this.displayInput &&this.displayInput.nativeElement){
              this.displayInput.nativeElement.textContent = this.finalInput(this.input); // Use textContent instead of innerHTML
            }}
          }
            /*update history display functon*/
            updateHistoryDisplay() {
              let historyHtml = "";
              for (let i = this.history.length - 1; i >= 0; i--) {
                const calculation = this.history[i];
                if (calculation.includes('=')) {
                  historyHtml += `<div>${calculation}</div>`;
                }
              }
              const historyDisplayElement = this.historyDisplay.nativeElement;
              if (historyDisplayElement) {
                historyDisplayElement.innerHTML = historyHtml;
              }
              this.saveHistory();
            }
          saveHistory() {
              // Get the existing history from localStorage
              const existingHistoryString = localStorage.getItem('calculatorHistory');
              // Parse the existing history from string to array or use an empty array if it's null
              const existingHistory: any[] = existingHistoryString ? JSON.parse(existingHistoryString) : [];
              // Concatenate the existing history with the current history
              const updatedHistory = existingHistory.concat(this.history);
              // Save the updated history back to localStorage
              localStorage.setItem('calculatorHistory', JSON.stringify(updatedHistory));
            }
            memoryStorage() {
              if (this.memory !== null) {
                sessionStorage.setItem('calculatorMemory', this.memory.toString());
              }
            }
          }
  
   

