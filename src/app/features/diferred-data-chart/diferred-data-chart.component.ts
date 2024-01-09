import { Component, OnInit ,Inject, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import * as moment from 'moment';
import { DiferredModeUsecases, chartBardDataSets, getRandomRgb, groupBy, makeTitle, mapDiferedData, mapToLabels, stationDataLabels } from 'src/@core';
import {  ChartBarDataInterface, DiferedComponentInterface, SessionInfoSchema, chartBuilder } from 'src/domain';

@Component({
  selector: 'app-diferred-data-chart',
  templateUrl: './diferred-data-chart.component.html',
  styleUrls: ['./diferred-data-chart.component.scss']
})
export class DiferredDataChartComponent implements OnInit,OnDestroy,chartBuilder,DiferedComponentInterface {

    constructor(
      @Inject('diferred:mode') private readonly usecases:DiferredModeUsecases,
      private readonly activeRoute:ActivatedRoute,
    ) { }

    scatters:string[]=[]
    times:string[]=[]
    scatterChart:Chart|any=null
    stationsInfo:SessionInfoSchema[]=[];
    stations:any[]=[]
    selectedStation:string='SMART188'
    sensors:any=[]
    ranges={
      start:moment().subtract(1,'days').format('YYYY-MM-DD'),
      end:moment().format('YYYY-MM-DD')
    }
    title = 'AQ54';
    data:ChartBarDataInterface|any = {
      labels: [],
      datasets: [],
    options: {
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
        }
      }
    }
    }
    chart:Chart|any;
    timeData:any=[];
    timer:any=null

    async ngOnInit(): Promise<void>{
      this.activeRoute.queryParams.subscribe(async(param:any)=>{
        const {station,start,end}=param
        if(station && start && end){
          this.ranges.end=end
          this.ranges.start=start
        this.builder(station)
        }else{
        station?this.builder(station):this.builder()
        }
      })


    }

    ngOnDestroy(): void {
    clearInterval(this.timer)
    }

  /**
   *this method is called once the component is loaded
  it makes an api call to retrieve required data according to given parameters
  * @param st
  */

    async builder(st:string=''){
    try{
      if(st){
        const {raw_data,station,sessionInfo:stationInfo} = await this.usecases.parallelExecution(st,this.ranges.start,this.ranges.end,this.title)
        this.selectedStation=station;
        this.stationsInfo =stationInfo;
        this.stations=this.stationsInfo.map((item:SessionInfoSchema)=>({station:item.station,selected:item.station==this.selectedStation?true:false}));
        const data:any= mapDiferedData(raw_data,this.stationsInfo[1].integrated_sensors);
        this.chartData(data)
      }else{
        const {raw_data,station,sessionInfo}= await this.usecases.execute(this.ranges.start,this.ranges.end,this.title)
        this.stationsInfo = sessionInfo
        this.stations=this.stationsInfo.map((item:SessionInfoSchema,index:number)=>({station:item.station,selected:index==0}));
        this.selectedStation=station;
        const data:any= mapDiferedData(raw_data,this.stationsInfo[1].integrated_sensors);
        this.chartData(data)
      }

      this.barBasedChart()
      this.scatterBasedChart()
        this.timer =   setInterval(()=>{
        this.updateScatter()
      },50000)
    }catch(err:any){
      throw new Error(err.message)
    }



  }


  /**
   *when it calls it handle data structure required for the different graphs
  * @param data
  */

  chartData(data:any=[]){

    const labels= stationDataLabels(this.stationsInfo);
    this.data.labels=labels;
    const d= mapToLabels(data,labels);
    const dt=chartBardDataSets(d);
    this.data.datasets=dt;
    this.timeData=dt;
    this.timeData=this.timeData.map((item:any)=>({...item,group:Object.entries(groupBy(this.timeData,(t:any)=>t.unit)).map((e:any)=>({unit:e[0],values:e[1],label:item.label}))}))
    const units:any[]=[];
    this.timeData.forEach((item:any,index:any)=>{
    const group=item.group.find((f:any)=>f.unit===item.unit&&!units.find(u=>u==f.unit))
    const gp = item.group.find((g:any)=>g.unit===item.unit);
    const xdata= gp?gp.values.find((v:any)=>v.label===item.label):null
    const ydata = gp?gp.values.filter((v:any)=>v.label!=item.label && v.unit===item.unit):[]
    const grp =groupBy(ydata,(g:any)=>g.label);

  if(ydata.length&&xdata){

  let xgroup:any=groupBy(xdata.dayValues,(d:any)=>d.x)
  const obj=Object.entries(grp)
  let y:any=obj.map((yd:any)=>({label:yd[0],ydata:groupBy(yd[1][0].dayValues,(f:any)=>f.x)}))

  let dts:any=[]
  Object.keys(xgroup).forEach((key:any)=>{

    y.forEach((yd:any)=>{
      xgroup[key].forEach((xd:any,id:number)=>{
        dts.push({data:{y:yd.ydata[key][id].y,x:xd.y},label:`${yd.label}=f(${item.label})`})
      })
    })

  })

  item['dayVal']=groupBy(dts,(d:any)=>d.label)


  }
  units.push(group?.unit)
  group?.values.forEach((v:any)=>{
  item['gunit']=v.unit
  item['dayData']?item['dayData']=item['dayData'].concat(v.dayValues):item['dayData']=v.dayValues;
  item['monthData']?item['monthData']=item['monthData'].concat(v.monthDays):item['monthData']=v.monthDays
  })
  })

  }

  /**
   * this method selecte randomly a sensor to update the scatter graph
   *
   */
  updateScatter(){
    const dt = this.timeData.filter((item:any)=>item.dayVal)
    const d=dt[Math.floor(Math.random()*(dt.length-1))]
    if(d){
      const scatterConfig:any= {
        type: 'scatter',
        data:{
          datasets:Object.entries(d.dayVal).map((item:any)=>{
              const data= item[1].map((dt:any)=>({...dt.data}))
              return {data,label:item[0]}

          }),

          backgroundColor:getRandomRgb(),

        },
        options: {
          responsive:true,
          plugins:{
            legend: {
              position: 'top',
            },
            title: makeTitle(`Correlation entre les donnés d'un capteur pris de façon aleatoire dans ${this.selectedStation} et le reste des capteurs selon l'unité de mesure ${d.unit}. et le temps de transmission des données.`)
          },
          scales:{
            y:{
              type:'linear',
              beginAtZero: true,
              title:makeTitle(`autres capteurs(${d.unit})`, getRandomRgb()),
              position:'left',
              ticks: {
                color: getRandomRgb()
              },

            },
            x:{
              type:'linear',
              position:'bottom',
              beginAtZero: true,
              title:makeTitle(`${d.label}(${d.unit})`,getRandomRgb()),
              ticks: {
                color: getRandomRgb()
              },
            },

          }
      }
      }
      this.scatterChart.options=scatterConfig.options
      this.scatterChart.data=scatterConfig.data
      this.scatterChart.update()
    }


    }

  /**
   * this method is used to build the chart bar
   * that showcases the distribution of data according to different sensors.
   * You ma change it to show the distribution of sensors' data according  to unit and timeStamp
   *
   */
  barBasedChart(){
  try{
    const diffRange=moment(this.ranges.end).diff(moment(this.ranges.start),'days')>=30
    const startTime=moment(this.ranges.start).toLocaleString().split(' ')
    var x0=`${startTime[1]}/${startTime[3]}`
    !diffRange?x0=`${startTime[2]}/${startTime[1]}`:null
    const config:any=
    {
    type: 'bar',
    data: {
        datasets:this.timeData.filter((f:any)=>f.gunit).map((data:any)=>(
          {
            data:diffRange?data.monthData:data.dayData,
            backgroundColor:getRandomRgb(),
            borderColor:getRandomRgb(),
            label:`${data.gunit}`,
            fill:false,
            tension:0.8
        }
        ))
    },
    options: {
      responsive:true,
      plugins:{
        legend: {
          position: 'top',
        },
        title: makeTitle(`Distribution temporelle des données selon le type de capteur  dans la station ${this.selectedStation}`)
      },
      scales: {
          x: {
              min:x0
          }
      }
  }
  }
  new Chart('chart',config)
  }catch(err:any){
  throw new Error(err.message)
  }

  }

  /**
   * Here we have the scatter based chart.
   * It takes randomly one variable (sensor) and builds a scatter chart.
   * It make the a correlation between the given sensor and the others in term of value
   * align with the same unit and data transmission timeStamp
   */
  scatterBasedChart(){
    const dt = this.timeData.filter((item:any)=>item.dayVal)
    const d=dt[Math.floor(Math.random()*(dt.length-1))]
    if(d){
      const scatterConfig:any= {
        type: 'scatter',
        data:{
          datasets:Object.entries(d.dayVal).map((item:any)=>{
              const data= item[1].map((dt:any)=>({...dt.data}))
              return {data,label:item[0]}
          }),

          backgroundColor:getRandomRgb(),

        },
        options: {
          responsive:true,
          plugins:{
            legend: {
              position: 'top',
            },

            title:makeTitle(`Correlation entre les donnés d'un capteur pris de façon aleatoire dans ${this.selectedStation} et le reste des capteurs selon l'unité de mesure ${d.unit}. et le temps de transmission des données.`)
          },
          scales:{
            y:{
              type:'linear',
              beginAtZero: true,
              title:makeTitle(`autres capteurs(${d.unit})`,getRandomRgb()),
              position:'left',
              ticks: {
                color: getRandomRgb()
              },

            },
            x:{
              type:'linear',
              position:'bottom',
              beginAtZero: true,
              title:makeTitle(`${d.label}(${d.unit})`,getRandomRgb()),
              ticks: {
                color: getRandomRgb()
              },
            },

          }
      }
      }
      this.scatters.push('sc')
      setTimeout(()=>{
      this.scatterChart= new Chart('sc',scatterConfig)
      },1000)
    }
  }






}
