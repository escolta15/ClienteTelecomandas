import { Dish } from './dish.model';

export class Command {
  public timeOpening: string;
  public dishes: Dish[];
  public timeClosing: string;

  constructor() {
    this.timeOpening = null;
    this.dishes = [];
    this.timeClosing = null;
  }
}
