import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-champion-card',
  templateUrl: './champion-card.component.html',
  styleUrls: ['./champion-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChampionCardComponent {

  @Input() name: string;
  @Input() bodyMassIndex: number;
  @Input() heightInCentimeters: number;
  @Input() massInKilograms: number;
}
