import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiResourceService } from '../api/api.resource.service';
import { GetStationCurrentValuesService } from '../UseCases/get-station-current-values.service';
import { GetStationSessionInfoUsecasesService } from '../UseCases/get-station-session-info-usecases.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    {
    provide:'station:currentVal',
    useClass:GetStationCurrentValuesService
  },
  {
    provide:'api',
    useClass:ApiResourceService
  },
  {
    provide:'station:sessionInfo',
    useClass:GetStationSessionInfoUsecasesService
  }
],
  exports:[]
})
export class ApiProxyModule {}
