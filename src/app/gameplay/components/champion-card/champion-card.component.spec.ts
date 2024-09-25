import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionCardComponent } from './champion-card.component';
import { TranslateMockPipe } from "../../../shared/testing/mocks";
import { MatCardModule } from "@angular/material/card";

describe('ChampionCardComponent', () => {
  let component: ChampionCardComponent;
  let fixture: ComponentFixture<ChampionCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChampionCardComponent],
      imports: [MatCardModule, TranslateMockPipe]
    });
    fixture = TestBed.createComponent(ChampionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
