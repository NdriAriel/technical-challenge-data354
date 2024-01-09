import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
/**
 * Here the preload spinner service
 */
@Injectable({
  providedIn: 'root'
})
export class IsLoadingService {
/**
 * Property used to setup spinner
 */
public load : BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false)

  constructor() { }
/**
 *setup spinner value
 ** true
 or
 ** false
 * @param value
 */
  setLoading(value=false){
    this.load.next(value)
  }

}
