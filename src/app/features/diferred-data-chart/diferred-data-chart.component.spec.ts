import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiferredDataChartComponent } from './diferred-data-chart.component';

describe('DiferredDataChartComponent', () => {
  let component: DiferredDataChartComponent;
  let fixture: ComponentFixture<DiferredDataChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiferredDataChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiferredDataChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
