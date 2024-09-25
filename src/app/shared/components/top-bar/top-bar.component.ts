import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent {

  isHomeRoute: boolean;
  isGameRoute: boolean;

  private readonly GAME_ROUTE = '/game';
  private readonly HOME_ROUTE = '/home';

  constructor(private router: Router, private changeDetectorRef: ChangeDetectorRef) {
    router.events.pipe(takeUntilDestroyed()).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomeRoute = event.url === this.HOME_ROUTE;
        this.isGameRoute = event.url === this.GAME_ROUTE;
        this.changeDetectorRef.detectChanges();
      }
    });
  }
}
