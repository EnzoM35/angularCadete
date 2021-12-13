import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginOKGuard } from '../shared/loginOKGuard/logged.guard';
import { DashboardComponent } from './dashboard.component';
import { TravelsComponent } from './pages/travels/travels.component';
import { AuthGuardGuard } from '../shared/loginGuard/login.guard';

const routes: Routes = [
  {
    path: '',

    component: DashboardComponent,
  },
  {
    path: 'travels',
    canActivate: [AuthGuardGuard],
    component: TravelsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
