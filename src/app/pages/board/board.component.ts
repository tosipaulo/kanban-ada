import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardsService } from './services/cards.service';
import { MatIconModule } from '@angular/material/icon';
import { CardModel, CardsGroupedByStatus } from './models/card.model';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, DragDropModule, CardComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  newCards: CardModel[] = [];

  cardsGroup: CardsGroupedByStatus = { ToDo: [], Doing: [], Done: [] };

  constructor(private cardService: CardsService){}

  ngOnInit(): void {
    this.cardService.getCards().subscribe(cardsGroup => this.cardsGroup = cardsGroup)
  }

  drop(event: CdkDragDrop<CardModel[]>) {
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    const item = event.container.data[event.currentIndex];
    item.lista = this.getListName(event.container.id); 
    console.log(event.container.data);
  }

  handleEventClick(card: CardModel, status: 'ToDo' | 'Doing' | 'Done') {
    const listName = card.lista as 'ToDo' | 'Doing' | 'Done';
    if(this.isValidList(listName)) {
      const index = this.cardsGroup[listName].indexOf(card);
      if (index !== -1) {
        this.cardsGroup[listName].splice(index, 1);
        if(this.isValidList(status)) {
          this.cardsGroup[status

          ].push(card);
          card.lista = status;
        }
      }
    }
  }

  private isValidList(lista: string): boolean {
    return ['ToDo', 'Doing', 'Done'].includes(lista);
  }

  getListName(containerId: string): 'ToDo' | 'Doing' | 'Done' {
    if (containerId.includes('todoList')) return 'ToDo';
    if (containerId.includes('doingList')) return 'Doing';
    if (containerId.includes('doneList')) return 'Done';
    throw new Error('Unknown container id');
  }

}
