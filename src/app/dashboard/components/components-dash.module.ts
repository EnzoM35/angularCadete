import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CardTravelComponent } from './card-travel/card-travel.component';
import { CardTravelAceptComponent } from './card-travel-acept/card-travel-acept.component';
import { CardHistoryComponent } from './card-history/card-history.component';
import { DialogCourseComponent } from './dialog-course/dialog-course.component';

@NgModule({
  declarations: [
    CardTravelComponent,
    CardTravelAceptComponent,
    CardHistoryComponent,
    DialogCourseComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [
    CardTravelComponent,
    CardTravelAceptComponent,
    CardHistoryComponent,
    DialogCourseComponent,
  ],
})
export class ComponentsDashModule {}
