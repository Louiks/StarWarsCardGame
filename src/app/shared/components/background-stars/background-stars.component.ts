import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-background-stars',
  templateUrl: './background-stars.component.html',
  styleUrls: ['./background-stars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundStarsComponent {
}
