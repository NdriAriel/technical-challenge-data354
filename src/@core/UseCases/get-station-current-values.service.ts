import { Injectable,Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiInterface, CurrentValuesSchema } from 'src/domain';

@Injectable({
  providedIn: 'root'
})
export class GetStationCurrentValuesService {
  constructor(@Inject('api') private readonly  api: ApiInterface) { }
  execute(stationName: string): Observable<CurrentValuesSchema> {
  return this.api.getCurrentValues(stationName)
 
 }
}
