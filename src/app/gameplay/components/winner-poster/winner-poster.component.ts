import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-winner-poster',
  templateUrl: './winner-poster.component.html',
  styleUrls: ['./winner-poster.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WinnerPosterComponent {

  @Input() startingText: string;
  @Input() calculationBase: string | null;
  @Input() winner: -1 | 0 | 1 | null;
}
