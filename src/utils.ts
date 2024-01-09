import * as moment from "moment";
import { ChartAnimation, CurrentValuesSchema, RangeDataSchema, SessionInfoSchema, chartTitle } from "src/domain";

/**
 *This utility function is used as helper in making a group of data from a given list according to key parameter.
 * @param list
 * @param getKey
 * @returns
 */
export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);


/**
 *We generate a random RGB value from this function
 * @returns
 */

export
function getRandomRgb() {
  try{
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;

    return 'rgb(' + r + ', ' + g + ', ' + b + ')';

  }catch(err:any){
    throw new Error(err.message)
  }
}

/**
 *this function maps the labels to the given lis of data
 * @param data
 * @param labels
 * @returns
 */

export function mapData(data:CurrentValuesSchema['values'],labels:String[]){
 try{
  const dt:number[]=[]
  labels.forEach(item=>{
  const val=data.find(d=>`${d.sensor}(${d?.unit})`.toLowerCase()===item.toLowerCase())
  val?dt.push(val.value):dt.push(0)
  })
  return dt

 }catch(err:any){
  throw new Error(err.message)
 }
}

/**
 * this function do almost the same with 2
 * *mapData
 * but is used for mapping data in case of diferred mode data visualisation
 * @param data
 * @param labels
 * @returns
 */
export function mapToLabels(data:any={},labels:any=[]){
try{
  const dt:any[]=[]
  labels.forEach((item:any)=>{
  const lb=item.split('(')[0]
  const val:any[]=data[`${lb}`]||[]
  val.length?dt.push({
       sensor: val[0].senor,
       unit:`(${item.split('(')[1]}`,
      monthValues: val.map((it:any) => {
      const time=moment(it.time).toLocaleString().split(' ')
      return{x:`${time[1]}/${time[3]}`,y:it.value}
    }),
     values: val.map((it:any) =>it.value),
     timeValues:val.map((it:any)=>({time:it.time,value:it.value})),
     dayValues: val.map((it:any) => {
      const time=moment(it.time).toLocaleString().split(' ')
      return{x:`${time[2]}/${time[1]}`,y:it.value}
    }),
  }):null
  })
  return dt

}catch(err:any){
  throw new Error(err.message)
}
}

/**
 *we map data acording to the unit of sensors
 * @param data
 * @param sensors
 * @returns
 */
export function mapDiferedData(data:RangeDataSchema['raw_data'],sensors:SessionInfoSchema['integrated_sensors']){
try{
var dt:any[]= data.map((item:any)=>{
  const obj=Object.entries(item)
 const d= obj.map((ob)=>{
    const senor=sensors.find((s:any)=>s.type==ob[0])
    return {value:item[`${senor?.type}`],senor:senor?.type,unit:senor?.unit,time:item.utc_timestamp}
  }).filter(f=>f.senor && f.unit)
  return d
}
)
let td:any[]=[]
dt.forEach((item:any)=>{
 td = td.concat(item)
})
return groupBy(td,(item:any)=>item.senor)
}
catch(err:any){
  throw new Error(err.message)
}

}


/**
 *we build datasets for chartbar config in case of
 ** diferred mode data visualisation
 * @param stationData
 * @returns
 */
export function chartBardDataSets(stationData:CurrentValuesSchema[]=[]){
try{
  return stationData.map((item:any)=>({
  type: 'bar',
  label: item.sensor,
  dayValues:item.dayValues,
  timeValues:item.timeValues,
  unit:item.unit,
  monthDays:item.monthValues,
  data:  item.values,//mapData(item.values,labels),
  borderColor: `${getRandomRgb()}`,
  backgroundColor: `${getRandomRgb()}`
}))

}
catch(err:any){
  throw new Error(err.message)
}
}

/**
 * we build datasets for chartbar config in case of
 * * real time mode data visualisation

 * @param stationData
 * @param labels
 * @returns
 */
export function chartBarDataSets(stationData:CurrentValuesSchema[],labels:String[]=[]){

try{
  return stationData.map(item=>({
    type: 'bar',
     label: item.station_name,
     data:  mapData(item.values,labels),
     borderColor: `${getRandomRgb()}`,
     backgroundColor: `${getRandomRgb()}`
   }))
}catch(err:any){
 throw new Error(err.message)
}

}
/**
 *make chart title according to given parameters
 * @param text
 * @param color
 * @returns
 */
export function makeTitle(text:string,color='blue'):chartTitle{
    return {
      text,
      color,
      display:true
    }
}

/**
 *config animation option for given chart
 * @param duration
 * @param easing
 * @param from
 * @param to
 * @param loop
 * @returns
 */
export function makeAnimation(duration=1000,easing='linear',from=1,to=0,loop=true):ChartAnimation{
  return  {
    tension: {
      duration,
      easing,
      from,
      to,
      loop
    }
  }
}

/**
 *we grab station labels
 * @param stations
 * @returns
 */
export function stationDataLabels(stations:SessionInfoSchema[]){
  try{
    return  stations[0].integrated_sensors.filter(item=>item.unit).map(item=>`${item.type}(${item.unit})`)
  }catch(err:any){
    throw new Error(err.message)
  }
}


/**
 *build dataset for updating chartbar in case of
 ** real time mode data visualisation
 * @param stationData
 * @param labels
 * @returns
 */
export function updateChartBarData(stationData:CurrentValuesSchema[],labels:string[]=[]){
  try{
    return stationData.map(item=>({station:item.station_name,data: mapData(item.values,labels)}))
  }catch(err:any){
   throw new Error(err.message)
  }

}
