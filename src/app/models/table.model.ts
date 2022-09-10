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
    for (let i = 0; i < this.command.dishes.length; i++) {
      const auxi = this.command.dishes[i];
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
    for (let i = 0; i < dishesToChoose.length; i++) {
      if (dishesToChoose[i].dishId == dishId) dish = dishesToChoose[i];
    }
    return dish;
  }
}
