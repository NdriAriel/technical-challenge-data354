import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiInterface, SessionInfoSchema } from 'src/domain';

@Injectable({
  providedIn: 'root'
})
export class GetStationSessionInfoUsecasesService {

  constructor(@Inject('api') private readonly api:ApiInterface) { }

  execute(projectName:string):Observable<Array<SessionInfoSchema>>{
    return this.api.getSessionInfo(projectName)

  }
}
