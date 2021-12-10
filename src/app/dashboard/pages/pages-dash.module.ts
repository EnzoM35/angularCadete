import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsDashModule } from '../components/components-dash.module';
import { TravelsComponent } from './travels/travels.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [TravelsComponent],
  imports: [CommonModule, ComponentsDashModule, MaterialModule],
  exports: [TravelsComponent],
})
export class PagesDashModule {}
