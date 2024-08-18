import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CardGroup, CardModel, CardsGroupedByStatus } from '../models/card.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) { }

  getCards() {
    return this.http.get<CardModel[]>(`${environment.api}/cards`).pipe(
      map(cards => this.groupByStatus(cards))
    ); 
  }

  private groupByStatus(cards: CardModel[]): CardsGroupedByStatus {
    return {
      ToDo: this.filterByStatus(cards, 'ToDo'),
      Doing: this.filterByStatus(cards, 'Doing'),
      Done: this.filterByStatus(cards, 'Done')
    };
  }

  private filterByStatus(cards: CardModel[], status: string) {
    return cards.filter(card => card.lista == status);
  }
}
