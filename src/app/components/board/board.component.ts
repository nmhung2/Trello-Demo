import { Component, OnInit, Input } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { BoardService } from '../../services/board.service';
import { Board, List, Card } from '../../models/board.model';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  isModalOpen: boolean = false;
  cardObject: Card;

  //@Input() board;
  board: Board;
  titleListEditor: boolean = false;

  editingListId: number;

  constructor(private boardService: BoardService) {}

  ngOnInit() {
    this.board = this.boardService.getBoard();
    this.boardService.getModalState().subscribe((state: any) => {
      console.log(state);
      this.isModalOpen = state.open;
      this.cardObject = state.card;
    });
  }

  /*****************************
  CARD ACTIONS
 *****************************/
  addCardAction(listId: number): void {
    let cardTitle = prompt('Name Card ? ');
    if (cardTitle != null) {
      if (cardTitle.trim().length > 0) {
        this.boardService.addCard(listId, cardTitle);
      }
    }
  }

  deleteCardAction(event, listId: number, cardId: number): void {
    event.stopPropagation();
    if (confirm('Delele card ? ')) {
      this.boardService.deleteCard(listId, cardId);
    }
  }

  drop(event: CdkDragDrop<Card[]>, listIndex: number) {
    if (event.previousContainer === event.container) {
      // move Card in the same List
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // move Card in Another List
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  /*********************
    LIST ACTIONS
  **********************/
  addListAction(): void {
    let listName = prompt('New coloum');
    if (listName != null) {
      if (listName.length > 0) {
        this.boardService.addList(listName);
      }
    }
  }

  editTitleList(list: List): void {
    this.editingListId = list.id;
    this.titleListEditor = true;
  }

  getTitleListOnKeyUp(titleListInput: string, list: List): void {
    list.name = titleListInput;
    this.editingListId = 0;
    this.titleListEditor = false;
  }

  deleteListAction(list) {
    event.stopPropagation();
    if (confirm('Delele ' + list.name + ' ? ')) {
      this.boardService.deleteList(list.id);
    }
  }

  /******************
    MODAL ACTIONS
  *******************/
  openModal(card) {
    console.log(card);
    this.isModalOpen = true;
    this.cardObject = card;
    console.log(this.boardService.getBoard());
  }

  closeModal() {
    this.isModalOpen = false;
    console.log(this.boardService.getBoard());
  }
}
