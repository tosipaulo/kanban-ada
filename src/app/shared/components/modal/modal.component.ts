import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { QuillModule } from 'ngx-quill'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from "../button/button.component";
import { CardModel } from '../../models/card.model';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    QuillModule,
    ButtonComponent
],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Output() eventModal = new EventEmitter<CardModel>();

  form!: FormGroup;
  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['blockquote'],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['link'],
      ['clean'],                                      
    ]
  };

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
