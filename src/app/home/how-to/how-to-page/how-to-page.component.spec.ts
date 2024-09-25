import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToPageComponent } from './how-to-page.component';
import { TextCardComponent } from "../../../shared/components/text-card/text-card.component";
import { TranslateMockPipe } from "../../../shared/testing/mocks";

describe('HowToPageComponent', () => {
  let component: HowToPageComponent;
  let fixture: ComponentFixture<HowToPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HowToPageComponent, TextCardComponent],
      imports: [TranslateMockPipe]
    });
    fixture = TestBed.createComponent(HowToPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
