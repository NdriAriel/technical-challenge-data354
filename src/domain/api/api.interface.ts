import { Observable } from "rxjs";
/**
 * used as return type of api calls for getting cirrent stations values
 */
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
/**
 * used as type of the return values of calling api to retrieve stations' information
 */
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

/**
 * this is typicaly for difered mode data retrieving the api call should return data as type this interface.
 */
export interface RangeDataSchema{
  raw_data:Array<{
    AUX1_INPUT: string,
    AUX2_INPUT: string,
    CO: number,
    CO2: number,
    NO2: number,
    O3: number,
    PM10: number,
    "PM2.5": number,
    RH: number,
    T: number,
    "Temp. int.": number,
    VOC: number,
    lat: number,
    lon: number,
    utc_timestamp: string
  }>
  station:string
}

/**
 * this interface represents data type of api calls to retrieve the last transmission status of given station
 */
export interface LatestTransmissionsResponseScema
  {
    last_transmission_utc: string,
    latitude: string,
    longitude: number,
    station_id: number,
    station_name: string
  }

  /**
   * Here is the api interface
   * we gather here all the different api call usecases
   */
export interface ApiInterface {
  getCurrentValues(stationName:string):Observable<CurrentValuesSchema>
  getSessionInfo(projectName:string):Observable<Array<SessionInfoSchema>>
  getRange(station:string,start:string,end:string):Observable<RangeDataSchema>
  getHourlyAvg(station:string,start:string,end:string):Observable<any>
  getLatestTransmissionStatus(stationId:number):Observable<LatestTransmissionsResponseScema>
}
