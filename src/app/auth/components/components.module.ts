import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MainLoginComponent } from './main-login/main-login.component';

@NgModule({
  declarations: [LoginComponent, MainLoginComponent],
  imports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule],
  exports: [LoginComponent, MainLoginComponent],
})
export class ComponentsModule {}
