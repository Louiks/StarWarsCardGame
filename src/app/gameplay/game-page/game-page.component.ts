import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameDriverService } from "../services/game-driver.service";
import { CalculationBase } from "../model/person.model";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamePageComponent {

  loadingPlayersState = this.gameDriverService.loadingChampionsState$;
  champions$ = this.gameDriverService.champions$;
  winner$ = this.gameDriverService.winner$;
  leftPlayerScore$ = this.gameDriverService.leftPlayerScore$;
  rightPlayerScore$ = this.gameDriverService.rightPlayerScore$;

  calculationBase: CalculationBase;
  historicalCalculationBase: CalculationBase;

  constructor(private gameDriverService: GameDriverService) {
    gameDriverService.calculationBase$.pipe(takeUntilDestroyed())
      .subscribe((newCalculationBase) => {
        this.calculationBase = newCalculationBase
        if (!this.historicalCalculationBase) {
          this.historicalCalculationBase = this.calculationBase;
        }
      });
  }

  drawBoth(): void {
    this.gameDriverService.drawBothChampions();
    this.historicalCalculationBase = this.calculationBase;
  }

  changeCalculationBase(newCalculationBase: CalculationBase): void {
    this.gameDriverService.changeCalculationBase(newCalculationBase);
  }
}
