import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardsService } from './services/cards.service';
import { MatIconModule } from '@angular/material/icon';
import { CardsGroupedByStatus } from './models/card.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  cardsGroup: CardsGroupedByStatus = { ToDo: [], Doing: [], Done: [] };

  constructor(private cardService: CardsService){}

  ngOnInit(): void {
    this.cardService.getCards().subscribe(cardsGroup => this.cardsGroup = cardsGroup)
  }
}
