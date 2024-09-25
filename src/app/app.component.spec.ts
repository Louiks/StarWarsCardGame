import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateService } from "@ngx-translate/core";
import { TopBarComponent } from "./shared/components/top-bar/top-bar.component";
import { BackgroundStarsComponent } from "./shared/components/background-stars/background-stars.component";
import { ActivatedRoute, RouterLink, RouterOutlet } from "@angular/router";
import { TranslateMockPipe } from "./shared/testing/mocks";
import { MatIconModule } from "@angular/material/icon";

export class MockTranslateService {

  public setDefaultLang(_: string): void {
  }
}

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, TopBarComponent, BackgroundStarsComponent],
      imports: [RouterOutlet, TranslateMockPipe, MatIconModule, RouterLink],
      providers: [
        { provide: TranslateService, useClass: MockTranslateService },
        { provide: ActivatedRoute, useValue: {} as ActivatedRoute },
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });


  it('should create the app', () => {
    const translateService = TestBed.inject(TranslateService) as MockTranslateService;
    spyOn<any>(translateService, 'setDefaultLang');
    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();

    expect(translateService.setDefaultLang).toHaveBeenCalled();
  });

});
