import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule, DialogRef } from '@angular/cdk/dialog';
import { QuillModule } from 'ngx-quill'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from "../button/button.component";
import { CardModel } from '../../models/card.model';
import { InputComponent } from '../input/input.component';
import { quillConfig } from '../../utils/quill-config';
@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    QuillModule,
    ButtonComponent,
    InputComponent
],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Output() eventModal = new EventEmitter<CardModel>();

  form!: FormGroup;
  quillConfig = quillConfig;

  constructor(
    public dialogRef: DialogRef<CardModel>,
    private fb: NonNullableFormBuilder
  ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: ['', [Validators.required]],
      conteudo: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  submit() {
    this.eventModal.emit({...this.form.value, lista: 'ToDo'})
  }
}
