import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCandidateComponent } from './about-candidate.component';

describe('AboutCandidateComponent', () => {
  let component: AboutCandidateComponent;
  let fixture: ComponentFixture<AboutCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
