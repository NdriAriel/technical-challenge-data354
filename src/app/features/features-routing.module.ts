import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiferredDataChartComponent } from './diferred-data-chart/diferred-data-chart.component';
import { RealTimeChartComponent } from './real-time-chart/real-time-chart.component';

/**
 * Here we set routing for features' components
 */
const routes: Routes = [
{
  component:DiferredDataChartComponent,
  path:'diferred'
},
{
  component:RealTimeChartComponent,
  path:'real-time'
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
