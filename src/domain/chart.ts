import { Chart } from "chart.js/auto"
import { CurrentValuesSchema } from "./api/api.interface"
/**
 * used as type  of chart title
 */
export
interface chartTitle{
  display:boolean
  text:string
  color:string
}
/**
 * used as type of chart animation option
 */
export interface ChartAnimation{
    tension: {
      duration:number,
      easing: string,
      from: number,
      to: number,
      loop: boolean
    }

}
/**
 * chartbar data requirements type
 */
export interface ChartBarDataInterface{

    labels:string[]
    datasets: Array<{
      type: string,
      label: string,
      data: number[],
      borderColor: string,
      backgroundColor: string
    }>
  options: {
    scales: {
      y: {
        beginAtZero: boolean,
        min: number,
        max: number
      }
    }
  }


}

/**
 * Used in both diferred mode data visualisation and real time data
 * visualisation compenents as interface of methods to be implemented.
 */
export interface chartBuilder{
  chartData():CurrentValuesSchema[]|any
  updateScatter(...args:any):void
}
/**
 * Should be implemented in diferred mode data visualisation
 * to setup data requirements
 */
export interface DiferedComponentInterface{
  barBasedChart(...args:any):void
  scatterBasedChart(...args:any):void
  builder(...args:any):any
}


/**
 *  Should be implemented in real time mode data visualisation
 * to setup data requirements
 */
export interface RealTimeChartComponentInterface{
  initChartBar(...args:any):Chart
  initScatter(...args:any):void
  scatterData(...args:any):any
  onChartsInit(...args:any):void
  updateTimeSeries(...args:any):any
  updateData(...args:any):any
  OntimeSerieChartInit(...args:any):void
}



