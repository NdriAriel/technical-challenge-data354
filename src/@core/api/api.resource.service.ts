import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiInterface, CurrentValuesSchema, LatestTransmissionsResponseScema, RangeDataSchema, SessionInfoSchema } from 'src/domain';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
/**
 * Api resource service
 */
@Injectable({
  providedIn: 'root'
})
export class ApiResourceService implements ApiInterface {
  /**
   * based api endpoint url
   */
  baseApi:string=environment.baseApi;
  constructor(private readonly http:HttpClient) { }
/**
 *
 * @param stationId
 * @returns
 */

  getLatestTransmissionStatus(stationId: number): Observable<LatestTransmissionsResponseScema> {
    return this.http.get<LatestTransmissionsResponseScema>(`${this.baseApi}${'getStationStatus'}/${stationId}`)
  }
/**
 *
 * @param station
 * @param start
 * @param end
 * @returns
 */
  getHourlyAvg(station:string,start:string,end:string): Observable<any> {
    return this.http.get<any>(`${this.baseApi}getHourlyAvg/${station}/${start}/${end}?pivot=${true}`)
  }
/**
 *
 * @param stationName
 * @returns
 */
  getCurrentValues(stationName: string): Observable<CurrentValuesSchema> {
    return this.http.get<CurrentValuesSchema>(this.baseApi+`getCurrentValues/${stationName}`)
  }
/**
 *
 * @param projectName
 * @returns
 */
  getSessionInfo(projectName: string): Observable<SessionInfoSchema[]> {
    return this.http.get<SessionInfoSchema[]>(this.baseApi+`getSessionInfo/${projectName}`)
  }

/**
 *
 * @param station
 * @param start
 * @param end
 * @returns
 */
  getRange(station:string,start:string,end:string): Observable<RangeDataSchema> {
    return this.http.get<RangeDataSchema>(this.baseApi+`getRange/${station}/${start}/${end}`)
  }
}
