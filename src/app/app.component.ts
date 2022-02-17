import { Component, VERSION } from '@angular/core';
import { Board, List, Card } from './models/board.model';
import { BoardService } from './services/board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'demo-trello';
  board;
  constructor(private boardService: BoardService) {}

  ngOnInit() {
    this.board = this.boardService.getBoard();
  }
}
