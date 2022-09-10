import { Component, OnInit } from '@angular/core';
import { Table } from '../../models/table.model';
import { TablesService } from '../../services/tables.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit {
  constructor(private tablesService: TablesService) {}

  ngOnInit() {
    this.tablesService.getTables();
  }

  public get tables(): Table[] {
    return this.tablesService.listTables();
  }

  public onClick(tableId: number): void {
    this.tablesService.openTable(tableId);
  }
}
