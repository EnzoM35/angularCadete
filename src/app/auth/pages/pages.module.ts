import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ComponentsModule],
  exports: [ReactiveFormsModule, LoginPageComponent],
})
export class PagesModule {}
