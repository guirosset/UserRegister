import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Grupo } from 'src/app/group/group.model';

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRadioComponent),
      multi: true
    }
  ]
})
export class InputRadioComponent implements OnInit, ControlValueAccessor {

  @Input() options: Grupo[]

  value: any

  onChange: any

  constructor() { }

  ngOnInit() {
  }

  setValue(value: any){
    this.value = value
    this.onChange(this.value)
  }

  /**
   * Write a new value to the element.
   */
  writeValue(obj: any): void {
    this.value = obj
  }
  /**
   * Set the function to be called when the control receives a change event.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  /**
   * Set the function to be called when the control receives a touch event.
   */
  registerOnTouched(fn: any): void {}
  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   *
   * @param isDisabled
   */
  setDisabledState?(isDisabled: boolean): void {}
}
