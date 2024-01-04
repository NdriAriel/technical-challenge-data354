import { Observable } from "rxjs";

export interface CurrentValuesSchema{
    station_name: string,
    timestamp: string,
    values:Array<
      {
        sensor: string,
        unit: string,
        value: number
      }
    >

}
export interface SessionInfoSchema{
  station: string,
  description: string,
  sessiond_id: number,
  integrated_sensors: Array<
    {
      type: string,
      unit: string|any
    }>
}
export interface ApiInterface {
  getCurrentValues(stationName:string):Observable<CurrentValuesSchema>
  getSessionInfo(projectName:string):Observable<Array<SessionInfoSchema>>
  getRange():Observable<any>
}
