import { Component, Inject, OnInit } from '@angular/core';
//import  {Chart}  from 'chart.js';
import {map, filter} from 'rxjs/operators';

import Chart from 'chart.js/auto';
import { GetStationCurrentValuesService, GetStationSessionInfoUsecasesService, chartBarDataSets, getRandomRgb, stationDataLabels, updateChartBarData,groupBy } from '../@core';
import {  CurrentValuesSchema, SessionInfoSchema } from 'src/domain';
import { Router } from '@angular/router';
import * as moment from 'moment';

export var multi = [
  {
    "name": "Germany",
    "series": [
      {
        "name": "2010",
        "value": 7300000
      },
      {
        "name": "2011",
        "value": 8940000
      }
    ]
  },

  {
    "name": "USA",
    "series": [
      {
        "name": "2010",
        "value": 7870000
      },
      {
        "name": "2011",
        "value": 8270000
      }
    ]
  },

  {
    "name": "France",
    "series": [
      {
        "name": "2010",
        "value": 5000002
      },
      {
        "name": "2011",
        "value": 5800000
      }
    ]
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
 constructor(
  @Inject('station:currentVal') private readonly stattionCurrentVal: GetStationCurrentValuesService,
  @Inject('station:sessionInfo') private readonly stationInfo:GetStationSessionInfoUsecasesService,
  private readonly router:Router
  ){}

  sensors:Array<{type:string,unit:string}>=[]
  scatters:string[]=[]
  scatterChart:any[]=[];
  times:string[]=[]
  timeData:any=[]
  timesCahrt:any=[]
  selections=[{
    pk:1,
    value:'Temps réel',
    selected:true
  },
  {
    pk:2,
    value:"Differé",
    selected:false
  },



]

  title = 'AQ54';
  data:any = {
    labels: [
      'January',
      'February',
      'March',
      'April'
    ],
    datasets: [{
      type: 'bar',
      label: 'Bar Dataset',
      data: [13, 20, 30, 40],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: `${getRandomRgb()}`
    },
    {
      type: 'bar',
      label: 'Line Dataset',
      data: [50, 50, 50, 50],
      fill: false,
      borderColor: `${getRandomRgb()}`
    }
  ],
  options: {
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100
      }
    }
  }


  }
  chart:any;

  stations:SessionInfoSchema[]=[]
  async ngOnInit(): Promise<void> {
    await this.chartData()
     this.chart= this.initChartBar()
     this.timeLabel()

     setInterval(async()=>{
    await this.updateData()
     await this.updateScatter()
     await this.updateTimeSeries()

     },10000)
  }

  initChartBar(){
    return new Chart('chart',{data:this.data,options:{
      responsive:true,
      plugins:{
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Distribution des données selon les types de capteurs par station.',

        }
      },
    }})
  }

  initScatter(d:CurrentValuesSchema[]=[]){
    var data =this.scatterData(d)
    !data.length?data=this.scatterData(d,4):null
   for(let sc=0;sc<this.scatters.length;sc++){
    const config:any = {
      type: 'scatter',
      data:data[sc],
      options: {
        responsive:true,
        plugins:{
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `Correlation entre les donnés d'un capteur pris de façon aleatoire dans ${data[sc].station} et le reste des capteurs selon l'unité de mesure (${data[sc].unit}).`
          }
        },
        scales:{
          y:{
            type:'linear',
            beginAtZero: true,
            title:{
              display:true,
              text:`${data[sc].sensors.join(',')}(${data[sc].unit})`
            },
            position:'left',
             ticks: {
              color: getRandomRgb()
            },

          },
          x:{
            type:'linear',
            position:'bottom',
            beginAtZero: true,
            title:{
              display:true,
              text:`${data[sc].sensor}(${data[sc].unit})`
            },
            ticks: {
              color: getRandomRgb()
            },
          },

        }
    }
  }
   setTimeout(()=>this.scatterChart.push({config,chart:new Chart((document.getElementById(this.scatters[sc]) as any),config)}),100)
   }
  }

  async updateScatter(e:any=null,v:CurrentValuesSchema[]=[]){
    e?e.preventDefault(true):null
   try{
    let stationVal:CurrentValuesSchema[]=[]
    v.length?stationVal=v:stationVal=await Promise.all(this.stations.map(async(s:SessionInfoSchema)=>await this.stattionCurrentVal.execute(s.station).toPromise()));
    const data =this.scatterData(stationVal)
  if(data.length)
    this.scatterChart.forEach((ch:any,index:number)=>{
     ch.config.data=data[index];
     ch.config.options=  {
      responsive:true,
      plugins:{
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `Correlation entre les donnés d'un capteur pris de façon aleatoire dans ${data[index]?.station} et le reste des capteurs selon l'unité de mesure (${data[index]?.unit}).`
        }
      },
      scales:{
        y:{
          type:'linear',
          position:'left',
          beginAtZero: true,
          title:{
            display:true,
            text:`${data[index].sensors.join(',')}(${data[index].unit})`
          },
           ticks: {
            color: getRandomRgb()
          },

        },
        x:{
          type: 'linear',
           title:{
             display:true,
             text:`${data[index].sensor}(${data[index].unit})`
           },
          beginAtZero: true,
          position:'bottom',
          ticks: {
            color: getRandomRgb()
          },
        },

      }
  }
   ch.chart.update()
    })
   }catch(err){
    console.log(err)
   }

}

  scatterData(d:CurrentValuesSchema[],n:any=null){
  let data:any=[]
    const selectedSensor=this.sensors[n||Math.floor(Math.random()*(this.sensors.length-1))]
    if(selectedSensor)
    d.forEach(item=>{
      const values=item.values.filter(v=>!v.unit?null:v.unit.toLowerCase()===selectedSensor.unit?.toLowerCase() && v.sensor!=selectedSensor.type)
      const selected=item.values.find(v=>v.sensor.toLowerCase()===selectedSensor.type.toLowerCase())
      selected && values.length?data.push({
        datasets:values.map(s=>({data:[{x:selected.value,y:s.value}],label:`${s.sensor}=f(${selected.sensor})`
      })),
      backgroundColor:getRandomRgb(),
      station:item.station_name,
      unit:selected?.unit,
      sensor:selected.sensor,
      sensors:values.map(s=>s.sensor)
      }):null
    })
    let cnv=[]
    for(let i=0;i<data.length;i++){
      cnv.push(Date.now()+"scattter"+i)
    }
    this.scatterChart.length==0? this.scatters=cnv:null;
  // data.length==0?this.scatterData(dt):null
    return data

}

onVisCahnge(item:any){
 item?item.target.value?this.router.navigate(['/'],{queryParams:{selection:item.target.value}}):null:null
}

 async chartData(){
  try{
    const stations:SessionInfoSchema[] = await this.stationInfo.execute(this.title).toPromise()
    this.stations=stations
    this.sensors=stations[0].integrated_sensors
    this.data.labels= stationDataLabels(stations)
    const stationData:CurrentValuesSchema[]= await Promise.all(stations.map(async(s:SessionInfoSchema)=>await this.stattionCurrentVal.execute(s.station).toPromise()))
    this.initScatter(stationData)
    const dataset=chartBarDataSets(stationData,this.data.labels)
    this.data.datasets=dataset;
  }catch(err :any){
    throw new Error(err.message)
  }

  }

  async updateData(){
    try{
      const stationData:CurrentValuesSchema[]= await Promise.all(this.stations.map(async(s:SessionInfoSchema)=>await this.stattionCurrentVal.execute(s.station).toPromise()))
      const data=updateChartBarData(stationData,this.data.labels)
      this.data.datasets.forEach((item:any,index:number) => {
       data.find(d=>d.station==item.label)?item.data=data.find(d=>d.station==item.label)?.data:this.data.datasets.splice(index,1);
      });
      this.chart.update()
      }
     catch(err:any){
      throw new Error(err.message)
    }
  }

async updateTimeSeries(){
  const time = moment((new Date())).format('YYYY-MM-DD 00:00:00')
 const stationData:CurrentValuesSchema[]= await Promise.all(this.stations.map(async(s:SessionInfoSchema)=>await (this.stattionCurrentVal.execute(s.station))?.toPromise()))
 let data:any=stationData.map(item=>({time:item.timestamp,station:item.station_name,values:groupBy(item.values,(v)=>v.unit)}));
 data=data.map((item:any)=>({...item,values:Object.entries(item.values).map(e=>e[1])}));

 data.forEach((d:any,index:number)=>{
    this.timesCahrt.forEach((s:any)=>{
      const tm = s.config.time===d.time
      if(!tm){
        const config:any=
        {
        type: 'bar',
        time:d.time,
        data: {
            datasets: d.values.map((item:any)=>({
              data:
                item.map((item:any)=>({y:item.value,x:d.time})),
                label:`(${item[0].unit})`,
                backgroundColor:getRandomRgb(),

            })
            )
        },
        options: {
          responsive:true,
          plugins:{
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: `Distribution temporelle des données selon l'unité de mesure dans la station ${d.station}`,

            }
          },
          scales: {
              x: {
                  min:this.timesCahrt[this.timesCahrt.length-1].config.time,
              }
          }
      }

      }
         //s.chart.config.update(config)
         console.log(this.timesCahrt[0].config.time)
        s.chart.options.plugins=config.options.plugins
        s.config=config

        config.data.datasets.forEach((dd:any)=>{
         const its= s.chart.data.datasets.find((f:any)=>dd.label===f.label)
         its?its.data.push(...dd.data):null
        })
        s.chart.update();
      }
    })
 })


}
 async timeLabel(){
 const time = moment((new Date())).format('YYYY-MM-DD 00:00:00')
 const stationData:CurrentValuesSchema[]= await Promise.all(this.stations.map(async(s:SessionInfoSchema)=>await this.stattionCurrentVal.execute(s.station).toPromise()))
 let data:any=stationData.map(item=>({time:item.timestamp,station:item.station_name,values:groupBy(item.values,(v)=>v.unit)}));
 data=data.map((item:any)=>({...item,values:Object.entries(item.values).map(e=>e[1])}))
 //const dt:any=[...data]
 //console.log(dt)

 data.forEach((d:any,index:number)=>{
  this.times.push(index+"times"+Date.now())
const config:any=
    {
    type: 'line',
    time:d.time,
    data: {
        datasets: d.values.map((item:any)=>({
          data:
            item.map((item:any)=>({y:item.value,x:d.time})),
            label:`(${item[0].unit})`,
            backgroundColor:getRandomRgb(),
            borderColor:getRandomRgb(),
            fill:false,
            tension:0.8
        })
        )
    },
    options: {
      responsive:true,
      plugins:{
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `Distribution temporelle des données selon l'unité de mesure dans la station ${d.station}`,

        }
      },
      scales: {
          x: {
              min:d.time,
             // type:'time',

          }
      }
  }

  }
  setTimeout(()=>{
    let chart = new Chart(this.times[index],config);
    this.timesCahrt.push({chart,config})
      },1000)

 })


 return time
}

}
