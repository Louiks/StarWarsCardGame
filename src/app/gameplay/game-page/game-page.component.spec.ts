import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePageComponent } from './game-page.component';
import { GameDriverService } from "../services/game-driver.service";
import { BehaviorSubject } from "rxjs";
import { SharedModule } from "../../shared/shared.module";
import { PointCounterComponent } from "../components/point-counter/point-counter.component";
import { SettingsMenuComponent } from "../components/settings-menu/settings-menu.component";
import { TranslateService } from "@ngx-translate/core";
import { WinnerPosterComponent } from "../components/winner-poster/winner-poster.component";
import { CalculationBase } from "../model/person.model";
import { MatIconModule } from "@angular/material/icon";
import { TranslateMockPipe } from "../../shared/testing/mocks";

class MockGameDriverService {
  calculationBaseSubject = new BehaviorSubject('height');
  calculationBase$ = this.calculationBaseSubject.asObservable();

  drawBothChampions(): void {
  }

  changeCalculationBase(calculationBase: CalculationBase): void {
    this.calculationBaseSubject.next(calculationBase);
  }
}

describe('GamePageComponent', () => {
  let component: GamePageComponent;
  let fixture: ComponentFixture<GamePageComponent>;
  let mockGameDriverService: MockGameDriverService;

  beforeEach(() => {
    mockGameDriverService = new MockGameDriverService();

    TestBed.configureTestingModule({
      declarations: [
        GamePageComponent,
        PointCounterComponent,
        SettingsMenuComponent,
        WinnerPosterComponent
      ],
      imports: [SharedModule, MatIconModule, TranslateMockPipe],
      providers: [
        {
          provide: GameDriverService,
          useValue: mockGameDriverService
        },
        TranslateService
      ]
    });
    fixture = TestBed.createComponent(GamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('drawBoth', () => {
    it('should call drawBothChampions method', () => {
      spyOn<any>(component['gameDriverService'], 'drawBothChampions');
      component.calculationBase = 'mass';
      component.historicalCalculationBase = 'height';

      component.drawBoth();
      expect(component['gameDriverService'].drawBothChampions).toHaveBeenCalled();
      expect(component.historicalCalculationBase).toEqual('mass');
    });
  });

  describe('changeCalculationBase', () => {
    it('should call changeCalculationBase method', () => {
      spyOn<any>(component['gameDriverService'], 'changeCalculationBase');

      component.changeCalculationBase('mass');
      expect(component['gameDriverService'].changeCalculationBase).toHaveBeenCalled();
    });
  });

  describe('constructor', () => {
    it('should not change historicalCalculationBase until drawBoth', () => {
      expect(component.calculationBase).toEqual('height');
      expect(component.historicalCalculationBase).toEqual('height');

      component.changeCalculationBase('mass');

      expect(component.calculationBase).toEqual('mass');
      expect(component.historicalCalculationBase).toEqual('height');

      component.drawBoth();

      expect(component.calculationBase).toEqual('mass');
      expect(component.historicalCalculationBase).toEqual('mass');
    });
  });
});
