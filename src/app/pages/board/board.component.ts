import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardsService } from './services/cards.service';
import { MatIconModule } from '@angular/material/icon';
import { CardModel, CardsGroupedByStatus } from './models/card.model';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/shared/components/card/card.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, CardComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  newCards: CardModel[] = [];

  cardsGroup: CardsGroupedByStatus = { ToDo: [], Doing: [], Done: [] };

  constructor(private cardService: CardsService){}

  ngOnInit(): void {
    this.newCards.push({
      titulo: 'Titulo 01',
      conteudo: 'Aqui vai um conteudo muito legal'
    })
    this.cardService.getCards().subscribe(cardsGroup => this.cardsGroup = cardsGroup)
  }
}
