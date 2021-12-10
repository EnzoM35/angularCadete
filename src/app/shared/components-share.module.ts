import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [FooterComponent],
})
export class ComponentsShareModule {}
