import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ChartsComponent } from './charts/charts.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
/**
 * Shared module
 * call in the needed module
 */
@NgModule({
  declarations: [
    HeaderComponent,
    ChartsComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports:[
    HeaderComponent,
    ChartsComponent,
    FooterComponent
  ]
})

export class SharedModule { }
