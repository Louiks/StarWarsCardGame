import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-point-counter',
  templateUrl: './point-counter.component.html',
  styleUrls: ['./point-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PointCounterComponent implements OnChanges {

  @Input() leftPlayerScore: number | null = 0;
  @Input() rightPlayerScore: number | null = 0;

  isUpdatingLeftScore = false;
  isUpdatingRightScore = false;
  previousLeftScore = 0;
  previousRightScore = 0;

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const leftPlayerScore = changes['leftPlayerScore'];
    const rightPlayerScore = changes['rightPlayerScore'];

    if (leftPlayerScore) {
      this.previousLeftScore = leftPlayerScore.previousValue;
      this.isUpdatingLeftScore = true;
      this.changeDetector.detectChanges();

      setTimeout(() => {
        this.isUpdatingLeftScore = false;
        this.changeDetector.detectChanges();
      }, 1000);
    }

    if (rightPlayerScore) {
      this.previousRightScore = rightPlayerScore.previousValue;
      this.isUpdatingRightScore = true;
      this.changeDetector.detectChanges();

      setTimeout(() => {
        this.isUpdatingRightScore = false;
        this.changeDetector.detectChanges();
      }, 1000);
    }
  }
}
