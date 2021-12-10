import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TravelsComponent } from './pages/travels/travels.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'travels', component: TravelsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
