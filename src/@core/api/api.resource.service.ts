import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiInterface, CurrentValuesSchema, SessionInfoSchema } from 'src/domain';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiResourceService implements ApiInterface {
  baseApi:string=environment.baseApi;

  constructor(private readonly http:HttpClient) { }

  getCurrentValues(stationName: string): Observable<CurrentValuesSchema> {
     return this.http.get<CurrentValuesSchema>(this.baseApi+`getCurrentValues/${stationName}`)
  }
  
  getSessionInfo(projectName: string): Observable<SessionInfoSchema[]> {
    return this.http.get<SessionInfoSchema[]>(this.baseApi+`getSessionInfo/${projectName}`)
  }

  getRange(): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
