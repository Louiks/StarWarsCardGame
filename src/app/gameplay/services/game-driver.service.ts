import { Injectable } from "@angular/core";
import { PeopleService } from "./people.service";
import { BehaviorSubject, first, forkJoin, Subject } from "rxjs";
import { CalculationBase, Person } from "../model/person.model";
import { initialLoadingState, loadedState, loadingState, LoadingState } from "../model/state.model";
import { TopBarDataService } from "../../shared/services/top-bar-data.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable()
export class GameDriverService {

  calculationBase: CalculationBase;
  championsSubject = new Subject<[Person, Person]>();
  winnerSubject = new Subject<-1 | 0 | 1>();
  loadingChampionsStateSubject = new BehaviorSubject<LoadingState>(initialLoadingState);
  leftPlayerScoreSubject = new BehaviorSubject<number>(0);
  rightPlayerScoreSubject = new BehaviorSubject<number>(0);

  calculationBase$ = this.topBarDataService.calculationBase$;
  loadingChampionsState$ = this.loadingChampionsStateSubject.asObservable();
  champions$ = this.championsSubject.asObservable();
  winner$ = this.winnerSubject.asObservable();
  leftPlayerScore$ = this.leftPlayerScoreSubject.asObservable();
  rightPlayerScore$ = this.rightPlayerScoreSubject.asObservable();

  constructor(private peopleService: PeopleService, private topBarDataService: TopBarDataService) {
    this.calculationBase$.pipe(takeUntilDestroyed())
      .subscribe((calculationBase) => this.calculationBase = calculationBase);
  }

  drawBothChampions(): void {
    this.startLoadingChampions();
    forkJoin([this.peopleService.getRandomPerson(), this.peopleService.getRandomPerson()]).pipe(first()).subscribe(
      (result) => {
        this.updateChampions(result);
        this.calculateWinner(result);
        this.finishLoadingChampions();
      })
  }

  changeCalculationBase(newCalculationBase: CalculationBase): void {
    this.topBarDataService.setCalculationBase(newCalculationBase);
  }

  private startLoadingChampions(): void {
    this.loadingChampionsStateSubject.next(loadingState);
  }

  private finishLoadingChampions(): void {
    this.loadingChampionsStateSubject.next(loadedState);
  }

  private calculateWinner(champions: [Person, Person]): void {
    const [leftPlayer, rightPlayer] = champions;
    const leftValue = leftPlayer[this.calculationBase];
    const rightValue = rightPlayer[this.calculationBase];
    const winner = leftValue > rightValue ? -1 : leftValue < rightValue ? 1 : 0;

    this.updateWinner(winner);
  }

  private updateChampions(champions: [Person, Person]): void {
    this.championsSubject.next(champions);
  }

  private updateWinner(winner: -1 | 0 | 1): void {
    this.winnerSubject.next(winner);

    if (winner !== 1) {
      const leftPlayerScore = this.leftPlayerScoreSubject.getValue();
      this.leftPlayerScoreSubject.next(leftPlayerScore + 1);
    }
    if (winner !== -1) {
      const leftPlayerScore = this.rightPlayerScoreSubject.getValue();
      this.rightPlayerScoreSubject.next(leftPlayerScore + 1);
    }
    //at tie both get a point
  }
}
