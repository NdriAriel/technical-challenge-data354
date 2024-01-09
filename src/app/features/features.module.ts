import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealTimeChartComponent } from './real-time-chart/real-time-chart.component';
import { DiferredDataChartComponent } from './diferred-data-chart/diferred-data-chart.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { SharedModule } from '../shared';

/**
 * Features Module
 * it's considered as submodule of the main module
 */
@NgModule({
    declarations: [
        RealTimeChartComponent,
        DiferredDataChartComponent
    ],
    imports: [
        CommonModule,
        FeaturesRoutingModule,
        SharedModule
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FeaturesModule { }
