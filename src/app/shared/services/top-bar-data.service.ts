import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CalculationBase } from "../../gameplay/model/person.model";

@Injectable({
  providedIn: 'root'
})
export class TopBarDataService {

  calculationBase$: Observable<CalculationBase>;

  private calculationBaseSubject = new BehaviorSubject<CalculationBase>('mass');

  constructor() {
    this.calculationBase$ = this.calculationBaseSubject.asObservable();
  }

  setCalculationBase(calculationBase: CalculationBase) {
    this.calculationBaseSubject.next(calculationBase);
  }
}
