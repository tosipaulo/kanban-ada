import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

interface Card {
  titulo: string;
  conteudo: string;
  lista: 'ToDo' | 'Doing' | 'Done';
  id?: string;
}

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})

export class AppComponent implements OnInit {
  ToDo: Card[] = [];
  Doing: Card[] = [];
  Done: Card[] = [];

  response = [
    {
      "titulo": "Teste 01",
      "conteudo": "sadfasdasdf",
      "lista": "ToDo",
      "id": "311c6967-1e37-4637-ada7-4cc704072e5e"
    },
    {
      "titulo": "Teste 02",
      "conteudo": "sadfasdasdf",
      "lista": "ToDo",
      "id": "829e49ac-434a-4e4a-9773-b737fdb22afd"
    },
    {
      "titulo": "Teste 03",
      "conteudo": "sadfasdasdf",
      "lista": "ToDo",
      "id": "d9de1a43-53a8-4ac1-8634-e45817e9cef8"
    },
    {
      "titulo": "Teste 04",
      "conteudo": "sadfasdasdf",
      "lista": "Doing",
      "id": "8822d65d-ab80-4e09-81c7-05d504da0197"
    },
    {
      "titulo": "Teste 05",
      "conteudo": "sadfasdasdf",
      "lista": "Done",
      "id": "a2bcd03c-7501-439f-9761-23eb3d30a8df"
    }
  ];
  

  ngOnInit(): void {
    this.ToDo = this.filterStatus('ToDo');
    this.Doing = this.filterStatus('Doing');
    this.Done = this.filterStatus('Done');
  }

  drop(event: CdkDragDrop<Card[]>) {
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
  }

  handleClickNext(item: Card, status: 'ToDo' | 'Doing' | 'Done') {
    const listName = item.lista as 'ToDo' | 'Doing' | 'Done';
    if(this.isValidList(listName)) {
      const index = this[listName].indexOf(item);
      if (index !== -1) {
        this[listName].splice(index, 1);
        this[status].push(item);
        item.lista = status;
      }
    }
  }

  handleClickPrev(item: Card, status: 'ToDo' | 'Doing' | 'Done') {
    const listName = item.lista as 'ToDo' | 'Doing' | 'Done';
    if(this.isValidList(listName)) {
      const index = this[listName].indexOf(item);
      if (index !== -1) {
        this[listName].splice(index, 1);
        this[status].push(item);
        item.lista = status;
      }
    }
  }

  filterStatus(status: string) {
    return this.response.filter(card => card.lista == status) as Card[]
  }

  isValidList(lista: string): boolean {
    return ['ToDo', 'Doing', 'Done'].includes(lista);
  }

  getListName(containerId: string): 'ToDo' | 'Doing' | 'Done' {
    if (containerId.includes('todoList')) return 'ToDo';
    if (containerId.includes('doingList')) return 'Doing';
    if (containerId.includes('doneList')) return 'Done';
    throw new Error('Unknown container id');
  }
}
