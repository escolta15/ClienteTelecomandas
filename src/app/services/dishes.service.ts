import { Injectable } from '@angular/core';
import { ReadyDish } from '../models/ready-dish.model';

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  private readyDishes: ReadyDish[] = [];

  public getReadyDishes(): void {
    const request = new XMLHttpRequest();
    request.open(
      'get',
      'http://localhost:8080/Java-Web/getPlatosListos.jsp',
      false
    );
    request.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        const response = JSON.parse(request.responseText);
        for (let i = 0; i < response.length; i++) {
          let dish = response[i].plato;
          let receivedCommand = {
            table: response[i].id,
            name: dish.nombre,
            units: dish.unidades,
          };
          this.readyDishes.push(receivedCommand);
        }
      }
    };
    request.send();
  }

  public listReadyDishes(): ReadyDish[] {
    return this.readyDishes;
  }

  public confirmDish(dish: ReadyDish): void {
    const request = new XMLHttpRequest();
    request.open('post', 'http://localhost:8080/Java-Web/confirmarPlatos.jsp');
    request.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        this.removeDish(dish);
      }
    };
    request.send('p=' + JSON.stringify(dish));
  }

  private removeDish(dish: ReadyDish): void {
    const idTable = dish.table;
    const name = dish.name;
    const units = dish.units;
    for (let i = 0; i < this.readyDishes.length; i++) {
      const command = this.readyDishes[i];
      if (
        command.name === name &&
        command.units === units &&
        command.table === idTable
      ) {
        this.readyDishes.splice(i, 1);
        break;
      }
    }
  }
}
