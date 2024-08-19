import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardsService } from './services/cards.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { CardModel, CardsGroupedByStatus, CardStatus } from 'src/app/shared/models/card.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    DragDropModule,
    CardComponent,
    ButtonComponent,
    DialogModule
],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  cardsGroup: CardsGroupedByStatus = { ToDo: [], Doing: [], Done: [] };
  isModeView = true;
  editingCardId: string | null = null;

  constructor(
    private cardService: CardsService,
    public dialog: Dialog
  ){}

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
    const newCard = {...item};
    newCard.lista = this.getListName(event.container.id); 
    
    this.cardService.updateCard(newCard).subscribe((cardReponse: CardModel) => {})
  }

  handleEventClick(card: CardModel, status: CardStatus) {
    const listName = card.lista as CardStatus;
    if(this.isValidList(listName)) {
      const index = this.cardsGroup[listName].indexOf(card);
      const newCard = {...card}
      newCard.lista = status;

      this.cardService.updateCard(newCard).subscribe((cardReponse: CardModel) => {
        if (index !== -1) {
          this.cardsGroup[listName].splice(index, 1);
          if(this.isValidList(status)) {
            this.cardsGroup[status].push(cardReponse);
            card.lista = status;
          }
        }
      })
    }
  }

  private isValidList(lista: string): boolean {
    return ['ToDo', 'Doing', 'Done'].includes(lista);
  }

  getListName(containerId: string): CardStatus {
    if (containerId.includes('todoList')) return 'ToDo';
    if (containerId.includes('doingList')) return 'Doing';
    if (containerId.includes('doneList')) return 'Done';
    throw new Error('Unknown container id');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {width: '500px'});

    dialogRef.componentInstance!.eventModal.subscribe((card: CardModel) => {
      this.cardService.addCard(card).subscribe((cardResponse: CardModel) => {
        this.cardsGroup.ToDo.push(cardResponse);
        dialogRef.close()
      })
    });
  }

  handleDelete(card: CardModel) {
    const cardId = card.id || '';
    this.cardService.deleteCard(cardId).subscribe(cardsGroup => this.cardsGroup = cardsGroup)
  }

  handleEdit(card: CardModel, status: CardStatus) {
    this.cardService.updateCard(card).subscribe((cardResponse: CardModel) => {
      const cardId = cardResponse.id || '';
      this.editingCardId = cardId;
      const index = this.cardsGroup[status].findIndex(card => card.id === cardId);
      if (index !== -1) {
        this.cardsGroup[status].splice(index, 1, cardResponse);
      }
      this.isModeView = true;
    });
  }

  isEditing(card: CardModel): boolean {
    return this.editingCardId === card.id;
  }

  stopEditing(cardId: string) {
    if (this.editingCardId === cardId) {
      this.editingCardId = null;
    }
  }

}
