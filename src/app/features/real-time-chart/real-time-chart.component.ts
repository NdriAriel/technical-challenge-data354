import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import {  chartBarDataSets, getRandomRgb, stationDataLabels, updateChartBarData,groupBy, RealTimeUseCases, makeTitle, makeAnimation } from '../../../@core';
import {  ChartBarDataInterface, CurrentValuesSchema, SessionInfoSchema, chartBuilder } from 'src/domain';

/**
 * Real time data visualisation compenent
 */
@Component({
  selector: 'app-real-time-chart',
  templateUrl: './real-time-chart.component.html',
  styleUrls: ['./real-time-chart.component.scss']
})
/**
 *we implemented the different interfaces for the well being of this component.
 */
export class RealTimeChartComponent implements OnInit,OnDestroy,chartBuilder,RealTimeChartComponent {

  constructor(
    @Inject('realTime:mode') private readonly usecases:RealTimeUseCases,
    ){}
/**
 * clear the time interval once the component is destroyed
 */
  ngOnDestroy(): void {
    clearInterval(this.time)
  }

  /**
   * diffrent properties of the class
   */
    selectedSensor:any
    scatterSensors:any=[];
    sensors:Array<{type:string,unit:string}>=[]

    scatters:string[]=[]
    scatterChart:any[]=[];
    times:string[]=[]
    timeData:any=[]
    timesCahrt:any=[]
    title = 'AQ54';
    time:any=''
    data:ChartBarDataInterface|any = {
      labels: [],
      datasets: [],
      options: {
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 100
        }
      }
    }

    }
    chart:Chart|any;
    stations:SessionInfoSchema[]=[]

/**
 * call once the componentis loaded to initiate firts visualisation requirements.
 */

    async ngOnInit(): Promise<void> {
      try{
        await  this.onChartsInit()
       this.time= setInterval(async()=>{
        this.stations.forEach(async(s:any)=>{
          await this.usecases.canUpdate(s.sessiond_id)?this.updateData(s):null
        })
        },1000)
      }catch(err:any){
        throw new Error(err.message)
      }

    }

    /**
     *
     * @returns ***chartbar instance
     * init chart bar chart config
     */

    initChartBar(){
      return new Chart('real-time-chart',{data:this.data,options:{
        responsive:true,
        maintainAspectRatio: true,
        plugins:{
          legend: {
            position: 'top',
          },
          title: makeTitle('Distribution des données selon les types de capteurs par station.')
        },
      }})
    }
/**
 *init the scatter chart config
 * @param d
 */
    initScatter(d:CurrentValuesSchema[]=[]){
      var data =this.scatterData(d)
      !data.length?data=this.scatterData(d,4):null
     for(let sc=0;sc<this.scatters.length;sc++){
      const config:any = {
        type: 'scatter',
        data:data[sc],
        station:data[sc].station,
        options: {
          responsive:true,
          animations:makeAnimation(),
          plugins:{
            legend: {
              position: 'top',
            },
            title: makeTitle(`Corelation entre les données d'un capteur pris aléatoirement dans ${data[sc].station} et les reste des capteurs.`)
          },
          scales:{
            y:{
              type:'linear',
              beginAtZero: true,
              title:makeTitle(`${data[sc].sensors.join(',')}(${data[sc].unit})`,getRandomRgb()),
              position:'left',
               ticks: {
                color: getRandomRgb()
              },

            },
            x:{
              type:'linear',
              position:'bottom',
              beginAtZero: true,
              title:makeTitle(`${data[sc].sensor}(${data[sc].unit})`,getRandomRgb()),
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
/**
 *
 * @param v update scatter chart
 * @param station
 */
    async updateScatter(v:CurrentValuesSchema[]=[],station:string=''){
     try{
      let stationVal:CurrentValuesSchema[]=v
      const data:any =this.scatterData(stationVal)
    if(data.length){
      const {chart}= this.scatterChart.find((sc:any)=>sc.config.station===station)
      //console.log(chart.config.data,data)
       chart.config.data.datasets.forEach((dt:any)=>{
        const d=data[0].datasets.find((item:any)=>item.label===dt.label)
        d?dt.data=dt.data.concat(d.data):null
       });
       chart.config.options=  {
        responsive:true,
        animations:makeAnimation(),
        plugins:{
          legend: {
            position: 'top',
          },
          title:makeTitle(`Correlation entre les donnés d'un capteur pris de façon aleatoire dans ${data[0]?.station} et le reste des capteurs selon l'unité de mesure (${data[0]?.unit}).`)
        },
        scales:{
          y:{
            type:'linear',
            position:'left',
            beginAtZero: true,
            title:makeTitle(`${data[0].sensors.join(',')}(${data[0].unit})`,getRandomRgb()),
             ticks: {
              color: getRandomRgb()
            },

          },
          x:{
            type: 'linear',
             title:{
               display:true,
               text:`${data[0].sensor}(${data[0].unit})`
             },
            beginAtZero: true,
            position:'bottom',
            ticks: {
              color: getRandomRgb()
            },
          },

        }
    }
     chart.update()
    }
     }catch(err:any){
      throw new Error(err.message)
     }

  }

/**
 *build scatter data requirements
 * @param d
 * @param n
 * @returns
 */
    scatterData(d:CurrentValuesSchema[],n:any=null){
    let data:any=[]
      const selectedSensor=this.selectedSensor?this.selectedSensor:this.sensors[n||Math.floor(Math.random()*(this.sensors.length-1))]

        
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
      return data

  }

/**
 * init all  the charts
 */
 async onChartsInit(){
    const data=await this.chartData()
    this.chart = this.initChartBar()
    this.OntimeSerieChartInit(data)
    this.initScatter(data)

  }

  /**
   *
   * @returns set up data requirements for charts' config
   */

   async chartData(){
    try{
      const {stations,sessionInfo:stationInfo} = await this.usecases.Oninit(this.title)
      this.stations=stationInfo
      this.sensors=stationInfo[0].integrated_sensors
      this.data.labels= stationDataLabels(stationInfo)
      const stationData:CurrentValuesSchema[]= stations
      const dataset=chartBarDataSets(stationData,this.data.labels)
      this.data.datasets=dataset;
      return stations;
    }catch(err :any){
      throw new Error(err.message)
    }

    }


    /**
     *
     * @param s update data by making api call
     */

    async updateData(s:any){
      try{
        const stationData:CurrentValuesSchema= await this.usecases.OnUpdate(s.station)
        const data=updateChartBarData([stationData],this.data.labels)
        this.chart.config.data.datasets.filter((u:any)=>u.label===s.station).forEach((item:any,index:number) => {
         data.find((d:any)=>d.station==item.label)?item.data=data.find((d:any)=>d.station==item.label)?.data:this.chart.config.data.datasets.splice(index,1)
        });
        this.chart.update()
        this.updateTimeSeries(stationData,s.station)
        this.updateScatter([stationData],s.station)
        }
        catch(err:any){
        throw new Error(err.message)
      }
    }

    /**
     *
     * @param d update time based chart config
     * @param station
     */
  async updateTimeSeries(d:CurrentValuesSchema,station:string){
   const stationData:CurrentValuesSchema[]= [d]
   let data:any=stationData.map(item=>({time:item.timestamp,station:item.station_name,values:groupBy(item.values,(v:any)=>v.unit)}));
   const dt:any= data.map((item:any)=>({...item,values:Object.entries(item.values).map(e=>e[1])}))
   const {chart} = this.timesCahrt.find((c:any)=>c.config.station===station)
   const config:any=
          {
          type: 'bar',
          time:dt[0].time,
          data: {
              datasets: dt[0].values.map((item:any)=>({
                data:
                  item.map((item:any)=>({y:item.value,x:dt[0].time})),
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
              title: makeTitle(`Distribution temporelle des données selon l'unité de mesure dans la station ${dt[0].station}`)

            }

        }
        }
          chart.config.options.plugins=config.options.plugins
          //chart.config.options.scales.x.max=dt[0].time,
         var update=false
          config.data.datasets.forEach((dd:any)=>{
           const its= chart.config.data.datasets.find((f:any)=>dd.label===f.label)
           update= its&&!its.data.find((t:any)=>t.x===dt[0].time)?its.data.push(...dd.data):false
          })
          update?chart.update():null;
  }

  /**
   *init time based chart config
   * @param d
   */
   async OntimeSerieChartInit(d:CurrentValuesSchema[]){
   const stationData:CurrentValuesSchema[]=d// await Promise.all(this.stations.map(async(s:SessionInfoSchema)=>await this.stattionCurrentVal.execute(s.station).toPromise()))

   let data:any=stationData.map(item=>({time:item.timestamp,station:item.station_name,values:groupBy(item.values,(v:any)=>v.unit)}));

   data=data.map((item:any)=>({...item,values:Object.entries(item.values).map(e=>e[1])}))

   data.forEach((d:any,index:number)=>{
   this.times.push(index+"times"+Date.now())
    const config:any=
      {
      type: 'line',
      time:d.time,
      station:d.station,
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
        animations:makeAnimation(),
        plugins:{
          legend: {
            position: 'top',
          },
          title: makeTitle(`Distribution temporelle des données selon l'unité de mesure dans la station ${d.station}`)
        },
        scales: {
            x: {
                min:d.time,
            },
            y:{
              min:0
            }
        }
    }

    }
    setTimeout(()=>{
      let chart = new Chart(this.times[index],config);
      this.timesCahrt.push({chart,config})
        },1000)
   })
  }

}
