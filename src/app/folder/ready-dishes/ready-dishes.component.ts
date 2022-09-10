import { Component, OnDestroy, OnInit } from '@angular/core';
import { DishesService } from '../../services/dishes.service';
import { ReadyDish } from '../../models/ready-dish.model';

@Component({
  selector: 'app-ready-dishes',
  templateUrl: './ready-dishes.component.html',
  styleUrls: ['./ready-dishes.component.scss'],
})
export class ReadyDishesComponent implements OnInit, OnDestroy {
  private interval;

  constructor(private dishesService: DishesService) {}

  ngOnInit() {
    this.dishesService.getReadyDishes();
    this.interval = setInterval(
      () => this.dishesService.getReadyDishes(),
      10000
    );
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  public get readyDishes(): ReadyDish[] {
    return this.dishesService.listReadyDishes();
  }

  public onReadyDish(dish: ReadyDish): void {
    this.dishesService.confirmDish(dish);
  }
}
