import { Component, Input, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./input.component.scss'],
  template: `
    <input 
    [type]="type"
    class="input"
    [class.custom]="styleType == 'white'"
    [placeholder]="placeholder"
    [(ngModel)]="inputValue" 
    (focus)="onTouched && onTouched()"
    (input)="onChange && onChange(inputValue)">
  `
})
export class InputComponent implements ControlValueAccessor {

  @Input() type?: string = 'text';
  @Input() placeholder: string  = '';
  @Input() styleType?: string = 'default';

  inputValue: string = '';

  protected onTouched?: () => {};
  protected onChange?: (value: string) => {};

  constructor(@Optional() private ngControl: NgControl){
    if(this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: string): void {
    this.inputValue = value;
  }

  registerOnChange(fn: any): void {
   this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
   this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    
  }

}
