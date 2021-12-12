import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CardTravelComponent } from './card-travel/card-travel.component';
import { CardTravelAceptComponent } from './card-travel-acept/card-travel-acept.component';
import { CardHistoryComponent } from './card-history/card-history.component';

@NgModule({
  declarations: [
    CardTravelComponent,
    CardTravelAceptComponent,
    CardHistoryComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [
    CardTravelComponent,
    CardTravelAceptComponent,
    CardHistoryComponent,
  ],
})
export class ComponentsDashModule {}
