import { Injectable } from '@angular/core';
import { data } from '../models/data';
import { Board, Card } from '../models/board.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor() {}
  private data: Board = data;

  private modalState$ = new Subject();

  /*
  Get table data
*/
  getBoard(): Board {
    return this.data;
  }

  /*
Add Card
*/
  addCard(listId, cardTitle): void {
    let list = this.data.find((list) => list.id == listId);
    list.cards = [
      { id: Date.now(), title: cardTitle, content: '' },
      ...list.cards,
    ];
  }

  /*
  Del Card
*/
  deleteCard(listId, cardId): void {
    let list = this.data.find((list) => list.id == listId);
    console.log(list);
    let card = list.cards.find((card) => card.id == cardId);
    console.log(card);
    let index = list.cards.indexOf(card);
    list.cards.splice(index, 1);
  }

  /*
  Edit Card
*/
  updateCard(listIndex, cardIndex, newCard): void {
    this.data[listIndex].cards[cardIndex] = newCard;
  }

  /*
  Add column
*/
  addList(listName): void {
    this.data.push({
      id: Date.now(),
      name: listName,
      color: '#009886',
      cards: [],
    });
  }

  /*
  Del column
*/
  deleteList(listId): void {
    let list = this.data.find((list) => list.id == listId);
    let index = this.data.indexOf(list);
    this.data.splice(index, 1);
  }

  setModalState(bool: boolean, card: Card): void {
    let state = {
      open: bool,
      card: card,
    };
    this.modalState$.next(state);
  }

  /*
  Used by BoardComponent
*/
  getModalState() {
    return this.modalState$;
  }
}
