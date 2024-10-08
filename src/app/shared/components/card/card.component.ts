import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DomSanitizer } from '@angular/platform-browser'
import { CardModel } from '../../models/card.model';
import { InputComponent } from '../input/input.component';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuillModule } from 'ngx-quill'
import { ButtonComponent } from '../button/button.component';
import { quillConfig } from '../../utils/quill-config';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatIconModule, 
    DragDropModule, 
    InputComponent,
    QuillModule,
    ButtonComponent
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card!: CardModel;
  @Input() controlBack: boolean = true;
  @Input() controlNext: boolean = true;
  @Input() isModeView: boolean = true;
  @Output() clickEventBack = new EventEmitter<CardModel>();
  @Output() clickEventNext = new EventEmitter<CardModel>();
  @Output() deleteEvent = new EventEmitter<CardModel>();
  @Output() editEvent = new EventEmitter<CardModel>();
  @Output() editCompleted = new EventEmitter<string>();
  @Output() eventModeView = new EventEmitter<boolean>();

  form!: FormGroup;
  quillConfig = quillConfig;
  editingCardId: string | null = null;

  constructor(
    private fb: NonNullableFormBuilder, 
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: ['', [Validators.required]],
      conteudo: ['', [Validators.required]]
    });
  }

  handleClickNext() {
    this.clickEventNext.emit(this.card);
  }

  handleClickBack() {
    this.clickEventBack.emit(this.card);
  }

  handleDelete() {
    this.deleteEvent.emit(this.card);
  }

  save() {
    const updatedCard = { ...this.card, ...this.form.value };
    this.editEvent.emit(updatedCard);
    this.isModeView = true;
    this.editCompleted.emit(this.card.id);
  }


  edit() {
    this.isModeView = false;
    this.eventModeView.emit(false);
    this.form.patchValue({
      titulo: this.card.titulo,
      conteudo: this.card.conteudo
    });
  }

  cancelEdit() {
    this.eventModeView.emit(true);
    this.isModeView = true;
  }

  byPassHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }

}
