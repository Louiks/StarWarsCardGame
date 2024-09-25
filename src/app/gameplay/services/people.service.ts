import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { Person, PersonRequest } from "../model/person.model";
import { catchError, map, Observable, take } from "rxjs";

@Injectable()
export class PeopleService {

  private readonly blackListedIndexes: number[] = [];
  private readonly baseUrl = environment.baseUrl;

  private readonly NUMBER_OF_CENTIMETERS_IN_METER = 100;
  private readonly LAST_PERSON_INDEX = 83;
  private readonly PEOPLE_PATH = 'people/';

  constructor(private http: HttpClient) {
  }

  getRandomPerson(): Observable<Person> {
    const attemptRequest = (): Observable<Person> => {

      const randomPersonIndex = this.getValidRandomPersonIndex();

      return this.http.get<PersonRequest>(`${this.baseUrl}${this.PEOPLE_PATH}${randomPersonIndex}`).pipe(
        take(1),
        map(this.mapPersonRequestToPerson.bind(this)),
        catchError(() => {
          this.blackListedIndexes.push(randomPersonIndex);
          return attemptRequest();
        })
      );
    };

    return attemptRequest();
  }

  private getRandomPersonIndex(): number {
    return Math.floor(Math.random() * this.LAST_PERSON_INDEX) + 1;
  }

  private getValidRandomPersonIndex(): number {
    let randomPersonIndex = this.getRandomPersonIndex();

    while (this.blackListedIndexes.includes(randomPersonIndex)) {
      randomPersonIndex = this.getRandomPersonIndex();
    }

    return randomPersonIndex;
  }


  private calculateBodyMassIndex(heightInCentimeters: string, massInKg: string): number {
    const heightInMeters = parseFloat(heightInCentimeters) / this.NUMBER_OF_CENTIMETERS_IN_METER;
    const massInKgParsed = parseFloat(massInKg);

    return parseFloat((massInKgParsed / (heightInMeters * heightInMeters)).toFixed(1));
  }

  private mapPersonRequestToPerson(personRequest: PersonRequest): Person {
    const person = personRequest.result.properties;
    const BMI = this.calculateBodyMassIndex(person.height, person.mass);
    const heightParsed = parseFloat(person.height)
    const massParsed = parseFloat(person.mass)

    return {
      name: person.name,
      height: this.ensureIsNumber(heightParsed),
      mass: this.ensureIsNumber(massParsed),
      BMI: this.ensureIsNumber(BMI),
    };
  }

  private ensureIsNumber(heightParsed: number): number {
    return isNaN(heightParsed) ? 0 : heightParsed;
  }
}
