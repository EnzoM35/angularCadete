import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardGuard } from '../shared/loginGuard/login.guard';
import { AuthLoginOKGuard } from '../shared/loginOKGuard/logged.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    canActivate: [AuthLoginOKGuard],
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
