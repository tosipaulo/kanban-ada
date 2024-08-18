import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonType } from './button.type';


@Component({
  selector: 'ui-button, button[ui-button]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {

  @Input() typeButton: 'submit' | 'reset' | 'button' = 'button';
  @Input() isDisabled = false;
  @Input() isLoading = false;
  @Output() clicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}


