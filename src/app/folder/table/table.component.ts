import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from '../../models/table.model';
import { TablesService } from '../../services/tables.service';
import { Category } from '../../models/category.model';
import { Dish } from '../../models/dish.model';
import { SegmentCustomEvent } from '../../models/segment-custom-event.model';
import { DishServer } from '../../models/dish-server.mode';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public id: number;
  public table: Table;
  public categories: Category[] = [];
  public dishesToChoose: Dish[] = [];
  public price: number = 0;
  public choosenDishes: Dish[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private tablesService: TablesService
  ) {}

  async ngOnInit() {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.table = await this.tablesService.getTableState(this.id);
    this.getCategories();
  }

  public onCloseTable(): void {
    this.tablesService.closeTable(this.id);
  }

  public segmentChanged(event: Event) {
    const selectCategory = event as SegmentCustomEvent;
    this.getDishesOfCategory(selectCategory.detail.value);
  }

  public onChooseDish(dishId: string) {
    this.table.addDish(dishId, this.dishesToChoose);
    this.choosenDishes = this.table.command.dishes;
    this.calculatePrice();
  }

  public deleteDish(dishId: string): void {
    const result = confirm('Do you want to delete this dish in the command?');
    if (result) {
      for (let i = 0; i < this.table.command.dishes.length; i++) {
        const deletedDish = this.table.command.dishes[i];
        if (deletedDish.dishId == dishId) {
          this.table.command.dishes.splice(i, 1);
          break;
        }
      }
      this.choosenDishes = this.table.command.dishes;
      this.calculatePrice();
    }
  }

  public confirmCommand(): void {
    const request = new XMLHttpRequest();
    request.open('post', 'http://localhost:8080/Java-Web/recibirComanda.jsp');
    request.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        alert('Command successfully done!');
      }
    };
    const p = {
      id: this.id,
      platos: this.parseData(),
    };
    request.send('p=' + JSON.stringify(p));
  }

  private getCategories(): void {
    const request = new XMLHttpRequest();
    request.open(
      'get',
      'http://localhost:8080/Java-Web/getCategorias.jsp',
      false
    );
    request.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        const response = JSON.parse(request.responseText);
        this.categories = [];
        for (const obtainedCategory of response) {
          const category = new Category(
            obtainedCategory._id,
            obtainedCategory.nombre
          );
          this.categories.push(category);
        }
      }
    };
    request.send();
  }

  private getDishesOfCategory(categoryId: string): void {
    const request = new XMLHttpRequest();
    request.open(
      'post',
      'http://localhost:8080/Java-Web/getPlatosDeCategoria.jsp',
      false
    );
    request.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        const response = JSON.parse(request.responseText);
        this.dishesToChoose = [];
        for (const obtainedPlato of response) {
          const plato = new Dish(
            categoryId,
            obtainedPlato._id,
            obtainedPlato.nombre,
            obtainedPlato.precio
          );
          this.dishesToChoose.push(plato);
        }
      }
    };
    const p = {
      idCategoria: categoryId,
    };
    request.send('p=' + JSON.stringify(p));
  }

  private calculatePrice(): void {
    let totalPrice: number = 0;
    for (const dish of this.table.command.dishes) {
      totalPrice += dish.price;
    }
    this.price = Math.round(totalPrice * 100) / 100;
  }

  private parseData(): DishServer[] {
    const dishes = [];
    for (let dish of this.table.command.dishes) {
      dishes.push({
        idCategoria: dish.categoryId,
        idPlato: dish.dishId,
        unidades: dish.units,
        nombre: dish.name,
      });
    }
    return dishes;
  }
}
