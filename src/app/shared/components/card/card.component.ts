import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModel } from 'src/app/pages/board/models/card.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card!: CardModel;
}
