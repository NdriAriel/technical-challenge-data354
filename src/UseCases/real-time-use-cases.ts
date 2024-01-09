import { Inject, Injectable } from "@angular/core";
import * as moment from "moment";
import { ApiInterface, CurrentValuesSchema, SessionInfoSchema } from "src/domain";

/**
 * Interface that is use as type for api call response
 */
export interface OninitResponseSchema{
  stations:CurrentValuesSchema[],
  sessionInfo:SessionInfoSchema[]
}


/**
 * This class handles api calls for real time mode data visualisation
 *
 */

@Injectable({providedIn:'root'})
export class RealTimeUseCases {
  /**
   *
   * @param api
   */
  constructor(@Inject('api') private readonly api:ApiInterface){}
/**
 *
 * @param projectName
 * @returns
 *   we retrieve needed data to start the realtime visualisation by fetching the current values of different sensors from all staions.

 */
 async Oninit(projectName:string):Promise<OninitResponseSchema>{
try{
  const sessionInfo= await this.api.getSessionInfo(projectName).toPromise();
  const stations = await Promise.all<CurrentValuesSchema|any>(sessionInfo.map(async(station:SessionInfoSchema)=>await this.api.getCurrentValues(station.station).toPromise()));
  return {stations,sessionInfo};
}catch(err:any)
{
  throw new Error(err.message)
}

  }

  /**
   *Once a change is detected in a station we run api  call to get the latest values of the sensors in that station.
    Doing that helps us in optimising the api calls.
   * @param station
    @returns
   */
 async OnUpdate(station:string):Promise<CurrentValuesSchema>{
  try{
   return await this.api.getCurrentValues(station).toPromise()
  }catch(err:any){
   throw new Error(err.message)
  }
  }

/**
 *we are fetching the latest transmission time in order to retrive the data of the give station.
 * @param sessionId
 * @returns
 */

 async canUpdate(sessionId:number):Promise<boolean>{
  try{
    const response=await this.api.getLatestTransmissionStatus(sessionId).toPromise()

      /** Here we retrieve the last transmission utc datetime */
    const {last_transmission_utc} = response
    const transTime= moment(last_transmission_utc);
    const now=moment()
    /**
     * we compare that datetime to the caurrent datetime if both match then we enable api call for new entries then we disbale the call
     */
    const value= now.diff(transTime,'minutes',true)==0&&last_transmission_utc?true:true // unfortunately this will allways be true because the api does not return valid data so we decided to make it always true.
    return value
  }catch(err:any){
    throw new Error(err.message)
  }

  }

}
