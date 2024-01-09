import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { ApiProxyModule, Aq54HttpInterceptor } from 'src/@core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared';
import { AboutCandidateComponent } from './about-candidate/about-candidate.component';
/**
 * main module 
 */
@NgModule({
  declarations: [
    AppComponent,
    AboutCandidateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ApiProxyModule,
    RouterModule,
    SharedModule
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[
    {
      provide:HTTP_INTERCEPTORS,
      multi:true,
      useClass:Aq54HttpInterceptor
    }
  ]
})

export class AppModule { }
