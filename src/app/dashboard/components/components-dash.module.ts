import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CardTravelComponent } from './card-travel/card-travel.component';

@NgModule({
  declarations: [CardTravelComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [CardTravelComponent],
})
export class ComponentsDashModule {}
