export interface Board extends Array<List> {}

export interface List {
  id: number;
  name: string;
  color: string;
  cards: Card[];
}

export interface Card {
  id: number;
  title: string;
  content: string;
}
