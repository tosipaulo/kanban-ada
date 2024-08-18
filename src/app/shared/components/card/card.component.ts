import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModel } from 'src/app/pages/board/models/card.model';
import { MatIconModule } from '@angular/material/icon';
import { CdkDrag, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, DragDropModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card!: CardModel;
  @Input() controlBack: boolean = true;
  @Input() controlNext: boolean = true;
  @Output() clickEventBack = new EventEmitter<CardModel>();
  @Output() clickEventNext = new EventEmitter<CardModel>();

  handleClickNext() {
    this.clickEventNext.emit(this.card);
  }

  handleClickBack() {
    this.clickEventBack.emit(this.card);
  }
}
