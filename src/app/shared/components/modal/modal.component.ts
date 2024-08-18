import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  constructor(public dialogRef: DialogRef<string>){}
}
