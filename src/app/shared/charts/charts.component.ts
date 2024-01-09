import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { SweetAlert } from 'sweetalert/typings/core';
/**
 * Declare require as a const and type any
 */
declare const require:any
/**
 * we declare swal as var and type
 * *SweetAlert
 */
declare var swal:SweetAlert
/**
 * then we require swal
 */
swal=require('sweetalert')
/**
 ** Chart component
 *
 */
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
/**
 * The chart component
 * is call in both real time mode and diferred mode data visualisation component.
 */
export class ChartsComponent implements OnInit {
/**
 ** input properties are declared here
 */
@Input('times') times:any[]=[];
@Input('scatters') scatters:any[]=[];
@Input('stations') stations:any[]=[];
@Input('chart') chart='real-time-chart'
@Input('selectedStation') selected='SMART188'
/**
 * the range start string
 */
start:string=moment().subtract(1,'days').format('YYYY-MM-DD')
/**
 *the range end string
 */
end:string=moment().format('YYYY-MM-DD')
/**
 * the date of the day
 */
today=moment().format('YYYY-MM-DD')
/**
 *
 * @param activeRoute
 * We inject the
 * *activatedRoute of Angular in our component
 */
constructor(private readonly activeRoute:ActivatedRoute) { }

/**
 * exected once the component is loaded and subscibe to routing
 * * Angular queryParams
 */
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((param:any)=>{
      const {start,end,station}=param
      start?this.start=start:null;
      end?this.end=end:null;
      station?this.selected=station:null
    })
  }


/**
 *executed when staion got changed
 * @param ev
 */
  changeStation(ev:any){
  const station =ev?.target.value;
  if(station){
    if(moment(this.end).format('YYYY-MM-DD')!=moment().subtract(1,'days').format('YYYY-MM-DD')||moment(this.start).format('YYYY-MM-DD')!=this.today){
     this.changeRange(station,'vous allez changer la plage de temps et la station des capteurs.')
    }else{

      swal({
        text:'vous allez changer de station de capteur',
        icon:'warning',
        buttons: {
         cancel: true,
         confirm: true,
       }
     }).then(res=>{
     res?location.href=`${'/visualisation/diferred?station'}=${station}`:null
     })
    }
  }
}

/**
 *executed when range got changed
 * @param station
 * @param message
 */
changeRange(station:string='',message=''){
  if(moment(this.end).format('YYYY-MM-DD')!=moment().subtract(1,'days').format('YYYY-MM-DD')||moment(this.start).format('YYYY-MM-DD')!=this.today){

    const diff= moment(this.end).diff(moment(this.start),'days')

    diff<0?(()=>{this.end=moment(this.end).add(Math.abs(diff),'days').format('YYYY-MM-DD');this.start=moment(this.start).subtract(Math.abs(diff),'days').format('YYYY-MM-DD') })():null

    if(diff<=30){
    swal({
       text:message||'vous allez changer la plage de temps',
       icon:'warning',
       buttons: {
        cancel: true,
        confirm: true,
      },

    }).then((resp:any)=>{
      if(resp){
       station?location.href=`${'/visualisation/diferred?station'}=${station}&&start=${moment(this.start).format('YYYY-MM-DD')}&&end=${moment(this.end).format('YYYY-MM-DD')}`:location.href=`${'/visualisation/diferred?station'}=${this.selected}&&start=${moment(this.start).format('YYYY-MM-DD')}&&end=${moment(this.end).format('YYYY-MM-DD')}`
      }
    })
  }else{
    swal({
      icon:'error',
      text:'le nombre de jours ne doit pas exceder 30 jours.'
    })
  }

  }
}


}
