import { Injectable } from '@angular/core';
import { Table } from '../models/table.model';
import { Command } from '../models/command.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TablesService {
  private tables: Table[] = [];

  constructor(private router: Router) {
    this.getTables();
  }

  public listTables(): Table[] {
    return this.tables;
  }

  public getTables(): void {
    const request = new XMLHttpRequest();
    request.open('get', 'http://localhost:8080/Java-Web/getMesas.jsp', false);
    request.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        const response = JSON.parse(request.responseText);
        if (this.tables.length == 0) {
          this.tables = [];
          for (let i = 0; i < response.length; i++) {
            const table = new Table(response[i]._id, response[i].estado);
            this.tables.push(table);
            this.getTableState(response[i]._id);
          }
        }
      }
    };
    request.send();
  }

  public async getTableState(tableId: number): Promise<any> {
    return await this.makeRequest(tableId);
  }

  public openTable(id: number): void {
    const request = new XMLHttpRequest();
    request.open('post', 'http://localhost:8080/Java-Web/abrirMesa.jsp');
    request.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        this.router.navigate([`/${id}`]);
      }
    };
    const p = {
      _id: id,
    };
    request.send('p=' + JSON.stringify(p));
  }

  public closeTable(id: number): void {
    const request = new XMLHttpRequest();
    request.open('post', 'http://localhost:8080/Java-Web/cerrarMesa.jsp');
    request.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        this.tables[id - 1] = new Table(id, 'Libre');
        this.router.navigate(['/tables']);
      }
    };
    const p = {
      _id: id,
    };
    request.send('p=' + JSON.stringify(p));
  }

  private makeRequest(id: number) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open(
        'post',
        'http://localhost:8080/Java-Web/getEstadoMesa.jsp',
        false
      );
      request.setRequestHeader(
        'Content-Type',
        'application/x-www-form-urlencoded'
      );
      request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
          const response = JSON.parse(request.responseText);
          if (response.estado == 'Ocupada') {
            this.tables[id - 1].state = 'Ocupada';
            this.tables[id - 1].command.timeOpening =
              response.comanda.horaApertura;
          }
          if (response.estado == 'Libre') {
            this.tables[id - 1].state = 'Libre';
            this.tables[id - 1].command = new Command();
          }
          resolve(this.tables[id - 1]);
        } else {
          reject({});
        }
      };
      const p = {
        _id: id,
      };
      request.send('p=' + JSON.stringify(p));
    });
  }
}
