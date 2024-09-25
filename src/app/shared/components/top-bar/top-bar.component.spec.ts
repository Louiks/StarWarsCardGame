import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { TopBarComponent } from './top-bar.component';
import { ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { TranslateMockPipe } from "../../testing/mocks";

const fakeActivatedRoute = {} as ActivatedRoute;

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;
  let routerEventsSubject: Subject<any>;

  beforeEach(async () => {
    routerEventsSubject = new Subject<any>();

    const mockRouter = {
      url: '/',
      events: routerEventsSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      declarations: [TopBarComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        ChangeDetectorRef
      ],
      imports: [
        MatIconModule,
        MatButtonModule,
        RouterLink,
        TranslateMockPipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update isHomeRoute and isGameRoute when navigation ends on home route', async () => {
    spyOn<any>(component['changeDetectorRef'], 'detectChanges');
    routerEventsSubject.next(new NavigationEnd(1, '/home', '/home'));

    fixture.whenStable().then(() => {
      expect(component.isHomeRoute).toBeTrue();
      expect(component.isGameRoute).toBeFalse();
      expect(component['changeDetectorRef'].detectChanges).toHaveBeenCalled();
    });
  });

  it('should update isHomeRoute and isGameRoute when navigation ends on game route', async () => {
    spyOn<any>(component['changeDetectorRef'], 'detectChanges');
    routerEventsSubject.next(new NavigationEnd(1, '/game', '/game'));
    fixture.whenStable().then(() => {
      expect(component.isHomeRoute).toBeFalse();
      expect(component.isGameRoute).toBeTrue();
      expect(component['changeDetectorRef'].detectChanges).toHaveBeenCalled();
    });
  });

  it('should trigger change detection on navigation end', () => {
    spyOn<any>(component['changeDetectorRef'], 'detectChanges');
    routerEventsSubject.next(new NavigationEnd(1, '/other', '/other'));

    expect(component['changeDetectorRef'].detectChanges).toHaveBeenCalled();
  });
});
