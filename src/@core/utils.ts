import { CurrentValuesSchema, SessionInfoSchema } from "src/domain";


export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);




export
function getRandomRgb() {
  var num = Math.round(0xffffff * Math.random());
  var r = num >> 16;
  var g = num >> 8 & 255;
  var b = num & 255;
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

export function mapData(data:CurrentValuesSchema['values'],labels:String[]){
   const dt:number[]=[]
   labels.forEach(item=>{
   const val=data.find(d=>`${d.sensor}(${d?.unit})`.toLowerCase()===item.toLowerCase())
   val?dt.push(val.value):dt.push(0)
   })
   return dt
}



export function chartBarDataSets(stationData:CurrentValuesSchema[],labels:String[]=[]){
  return stationData.map(item=>({
  type: 'bar',
  label: item.station_name,
  data:  mapData(item.values,labels),
  borderColor: `${getRandomRgb()}`,
  backgroundColor: `${getRandomRgb()}`
}))
}


export function stationDataLabels(stations:SessionInfoSchema[]){
  return  stations[0].integrated_sensors.filter(item=>item.unit).map(item=>`${item.type}(${item.unit})`)
}

export function updateChartBarData(stationData:CurrentValuesSchema[],labels:string[]=[]){
return stationData.map(item=>({station:item.station_name,data: mapData(item.values,labels)}))
}
