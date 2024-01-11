import { Component, OnInit } from '@angular/core';
import { IsLoadingService } from 'src/@core';

/**
 * the main component that handles the transition between different components and modules
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  spinning=false
  title='AQ54'
  constructor( public isLoading:IsLoadingService){}
  /**
   * executed once the component got initiated
   */
  ngOnInit(): void {
    /**
     * we wait a 1ms for things to be setted up.
     */
    setTimeout(()=>{
      this.isLoading.load.subscribe((res:boolean)=>{
        this.spinning=res
      })
    },1000)

  }


}
