import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiResourceService } from '../api/api.resource.service';
import { DiferredModeUsecases } from '..';
import { RealTimeUseCases } from 'src/UseCases';
/**
 * Api proxy module
 * here we setup configuration of the different api usecases
 *
 */    

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[

  {
    provide:'api',
    useClass:ApiResourceService
  },

  {
    provide:"diferred:mode",
    useClass:DiferredModeUsecases
  },
  {
    provide:'realTime:mode',
    useClass:RealTimeUseCases
  }

],
exports:[]
})
export class ApiProxyModule {}
