import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PeopleService } from './people.service';
import { PersonRequest } from '../model/person.model';
import { environment } from '../../../environments/environment';

describe('PeopleService', () => {
  let service: PeopleService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PeopleService],
    });

    service = TestBed.inject(PeopleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should fetch a pseudo-random person successfully', () => {
    spyOn<any>(service, 'getValidRandomPersonIndex').and.returnValue(1);
    const mockPersonResponse: PersonRequest = {
      result: {
        properties: {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77'
        }
      }
    } as PersonRequest;

    service.getRandomPerson().subscribe(person => {
      expect(person).toBeDefined();
      expect(person.name).toEqual('Luke Skywalker');
      expect(person.height).toEqual(172);
      expect(person.mass).toEqual(77);
      expect(person.BMI).toBeCloseTo(26.0, 1);
    });

    const randomPersonIndex = 1;
    const request = httpTestingController.expectOne(`${environment.baseUrl}people/${randomPersonIndex}`);

    expect(request.request.method).toEqual('GET');
    request.flush(mockPersonResponse);
  });

  it('should handle error and blacklist index', async () => {
    spyOn<any>(service, 'getValidRandomPersonIndex').and.returnValue(1);
    const mockPersonResponse: PersonRequest = {
      result: {
        properties: {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77'
        }
      }
    } as PersonRequest;

    service.getRandomPerson().subscribe({
        next: () => expect(service['blackListedIndexes']).toContain(1)
      }
    );

    const firstRequest = httpTestingController.expectOne(`${environment.baseUrl}people/1`);
    firstRequest.flush({ message: 'FAILED' }, { status: 400, statusText: '' });

    const secondRequest = httpTestingController.expectOne(`${environment.baseUrl}people/1`);
    secondRequest.flush(mockPersonResponse);
  });

  it('should correctly calculate BMI', () => {
    const height = '180';
    const mass = '75';
    const expectedBMI = service['calculateBodyMassIndex'](height, mass);

    expect(expectedBMI).toBeCloseTo(23.1, 1);
  });

  it('should ensure that NaN values are handled correctly', () => {
    expect(service['ensureIsNumber'](NaN)).toBe(0);
    expect(service['ensureIsNumber'](10)).toBe(10);
  });
});
