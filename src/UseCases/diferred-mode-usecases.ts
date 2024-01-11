import { Inject, Injectable } from "@angular/core";
import { ApiInterface, RangeDataSchema, SessionInfoSchema } from "src/domain";
export interface parallelExecutionResponseType{
  raw_data:RangeDataSchema['raw_data']
  station:string
  sessionInfo:SessionInfoSchema[]
}

/**
 * This class handles api calls for diferred mode data visualisation
 *
 */
@Injectable({providedIn:'root'})
export class DiferredModeUsecases {

  /**
   *
   * @param api
   */
  constructor(@Inject('api') private readonly api:ApiInterface){}
  /**
   *
   * @param stationName
   * @param start
   * @param end
   * @param projectName
   *  we know the station so we can make api call in parallel to retrieve needed information for that usecase.
   * @returns
   */

 async parallelExecution(stationName:string='',start:string,end:string,projectName:string):Promise<parallelExecutionResponseType>{
    try{
      const [{raw_data,station},sessionInfo] = await Promise.all([
        await this.api.getRange(stationName,start,end).toPromise(),
        await this.api.getSessionInfo(projectName).toPromise()
      ])
    return {raw_data,station,sessionInfo}
    }catch(err:any){
     throw new Error(err.message)
    }
  }


  /**
   *
   * @param start
   * @param end
   * @param projectName
   * Here we are fetching the sessions information in order to pick randomly a station and request needed data for the  usecase.
   */

  async execute(start:string,end:string,projectName:string){
    try{
    const sessionInfo = await this.api.getSessionInfo(projectName).toPromise()
    const {raw_data,station} = await this.api.getRange(sessionInfo[Math.floor(Math.random()*(sessionInfo.length-1))].station,start,end).toPromise()
    return {raw_data,station,sessionInfo}

  }catch(err:any){
      throw new Error(err.message)
    }
  }


}
