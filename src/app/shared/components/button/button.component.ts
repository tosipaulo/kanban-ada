import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonType } from './button.type';


@Component({
  selector: 'ui-button, button[ui-button]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() configButton: ButtonType = {
    type: 'default', text: 'Text default'
  };
  @Input() typeButton: 'submit' | 'reset' | 'button' = 'button';
  @Input() isDisabled = false;
  @Input() isLoading = false;
  @Output() clicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}


