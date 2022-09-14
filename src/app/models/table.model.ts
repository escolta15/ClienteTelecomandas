import { Command } from './command.model';
import { Dish } from './dish.model';

export class Table {
  public id: number;
  public state: string;
  public command: Command;

  constructor(id: number, state: string) {
    this.id = id;
    this.state = state;
    this.command = new Command();
  }

  public addDish(dishId: string, dishesToChoose: Dish[]): void {
    let dish = null;
    const foundDish = this.findDish(dishId, dishesToChoose);
    for (const auxi of this.command.dishes) {
      if (auxi.dishId == dishId) {
        dish = auxi;
        break;
      }
    }
    if (dish == null) {
      dish = new Dish(
        foundDish.categoryId,
        dishId,
        foundDish.name,
        foundDish.price
      );
      this.command.dishes.push(dish);
    }
    dish.units += 1;
    dish.price = Math.round(dish.units * foundDish.price * 100) / 100;
  }

  private findDish(dishId: string, dishesToChoose: Dish[]): Dish {
    let dish = null;
    for (const choosenDish of dishesToChoose) {
      if (choosenDish.dishId == dishId) dish = choosenDish;
    }
    return dish;
  }
}
