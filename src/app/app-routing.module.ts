import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutCandidateComponent } from './about-candidate/about-candidate.component';
/**
 * App routing
 * this module should load all the different routing module
 * and map each route request to the corresponding route
 */
const routes: Routes = [
   {
    path:'',
    redirectTo:'/visualisation/real-time',
    pathMatch:'full'
   },

   {
    component:AboutCandidateComponent,
    path:'david'
   },

  {
    path:'visualisation',
    loadChildren:()=>import('./features').then(m=>m.FeaturesModule)
  },
  {
    path:'**',
    redirectTo:'/visualisation/real-time',
    pathMatch:'full'
   },
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled',preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
