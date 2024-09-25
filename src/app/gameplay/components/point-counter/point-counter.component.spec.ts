import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointCounterComponent } from './point-counter.component';

describe('PointCounterComponent', () => {
  let component: PointCounterComponent;
  let fixture: ComponentFixture<PointCounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointCounterComponent]
    });
    fixture = TestBed.createComponent(PointCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
