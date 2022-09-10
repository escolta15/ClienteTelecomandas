export class Dish {
  public categoryId: string;
  public dishId: string;
  public name: string;
  public price: number;
  public units: number;

  constructor(categoryId: string, dishId: string, name: string, price: number) {
    this.categoryId = categoryId;
    this.dishId = dishId;
    this.name = name;
    this.price = price;
    this.units = 0;
  }
}
