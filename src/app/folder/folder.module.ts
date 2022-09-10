import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { TablesComponent } from './tables/tables.component';
import { TableComponent } from './table/table.component';
import { ReadyDishesComponent } from './ready-dishes/ready-dishes.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FolderPageRoutingModule],
  declarations: [
    FolderPage,
    AboutComponent,
    HomeComponent,
    TablesComponent,
    TableComponent,
    ReadyDishesComponent,
  ],
})
export class FolderPageModule {}
