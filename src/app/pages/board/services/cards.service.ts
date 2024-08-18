import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { CardModel, CardsGroupedByStatus } from 'src/app/shared/models/card.model';

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

  addCard(card:CardModel) {
    return this.http.post<CardModel>(`${environment.api}/cards`, card);
  }

  deleteCard(cardId:string) {
    return this.http.delete<CardModel[]>(`${environment.api}/cards/${cardId}`).pipe(
      map(cards => this.groupByStatus(cards))
    );
  }

  updateCard(card:CardModel) {
    return this.http.put<CardModel>(`${environment.api}/cards/${card.id}`, card);
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
