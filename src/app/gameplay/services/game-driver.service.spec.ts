import { TestBed } from '@angular/core/testing';
import { GameDriverService } from './game-driver.service';
import { PeopleService } from './people.service';
import { TopBarDataService } from '../../shared/services/top-bar-data.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CalculationBase, Person } from '../model/person.model';
import { MatCardModule } from '@angular/material/card';

class MockPeopleService {
  getRandomPerson(): Observable<Person> {
    return of({ height: 213, mass: 7 } as Person);
  }
}

class MockTopBarDataService {
  private calculationBaseSubject = new BehaviorSubject<CalculationBase>('height');

  calculationBase$ = this.calculationBaseSubject.asObservable();

  setCalculationBase(newBase: CalculationBase) {
    this.calculationBaseSubject.next(newBase);
  }
}

describe('GameDriverService', () => {
  let service: GameDriverService;
  let peopleService: PeopleService;
  let topBarDataService: TopBarDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule],
      providers: [
        GameDriverService,
        { provide: PeopleService, useClass: MockPeopleService },
        { provide: TopBarDataService, useClass: MockTopBarDataService },
      ],
    });
    service = TestBed.inject(GameDriverService);
    peopleService = TestBed.inject(PeopleService);
    topBarDataService = TestBed.inject(TopBarDataService);
  });

  describe('drawBothChampions', () => {
    it('should draw both champions and calculate the winner', (done) => {
      service.champions$.subscribe((champions) => {
        expect(champions).toBeDefined();
        expect(champions?.length).toBe(2);
        done();
      });

      service.drawBothChampions();

      service.winner$.subscribe(winner => {
        expect(winner).toBe(-1);
      });
    });
  });

  describe('changeCalculationBase', () => {
    it('should change calculation base', () => {
      service.changeCalculationBase('mass');
      expect(service.calculationBase).toBe('mass');
    });
  });

  describe('startLoadingChampions & finishLoadingChampions', () => {
    it('should manage loading state', () => {
      const loadingState = service.loadingChampionsStateSubject.getValue();
      expect(loadingState.loading).toBeFalse();
      expect(loadingState.loaded).toBeFalse();

      service['startLoadingChampions']();

      const loadingStateWhileLoading = service.loadingChampionsStateSubject.getValue();
      expect(loadingStateWhileLoading.loading).toBeTrue();
      expect(loadingStateWhileLoading.loaded).toBeFalse();

      service['finishLoadingChampions']();

      const loadingStateAfter = service.loadingChampionsStateSubject.getValue();
      expect(loadingStateAfter.loading).toBeFalse();
      expect(loadingStateAfter.loaded).toBeTrue();
    });
  });
});
