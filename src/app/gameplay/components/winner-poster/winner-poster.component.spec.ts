import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerPosterComponent } from './winner-poster.component';
import { TranslateMockPipe } from "../../../shared/testing/mocks";

describe('WinnerPosterComponent', () => {
  let component: WinnerPosterComponent;
  let fixture: ComponentFixture<WinnerPosterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WinnerPosterComponent],
      imports: [TranslateMockPipe]
    });
    fixture = TestBed.createComponent(WinnerPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
