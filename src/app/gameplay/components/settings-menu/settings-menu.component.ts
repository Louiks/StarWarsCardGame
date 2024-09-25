import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { CalculationBase } from "../../model/person.model";

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsMenuComponent implements AfterViewInit, OnDestroy {

  isMenuOpen = false;
  shouldAnimate = false;

  @Input() calculationBase: CalculationBase;
  @Output() calculationBaseChanged = new EventEmitter<CalculationBase>();

  @ViewChild('toggleButton') toggleButton: ElementRef;
  @ViewChild('menu') menu: ElementRef;

  private readonly ANIMATION_DURATION_MS = 1000;
  private windowClickListener: () => void;
  private numberOfTimeouts = 0;

  constructor(
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit(): void {
    this.windowClickListener = this.renderer.listen('window', 'click', this.onWindowClick.bind(this));
  }

  ngOnDestroy(): void {
    if (this.windowClickListener) {
      this.windowClickListener();
    }
  }

  changeCalculationBase(event: Event, newCalculationBase: CalculationBase): void {
    event.stopPropagation();
    this.calculationBaseChanged.emit(newCalculationBase);
  }

  private onWindowClick(event: Event): void {
    const buttonClicked = this.isToggleButtonClicked(event);

    if (buttonClicked) {
      this.toggleMenu();
    } else if (!this.isMenuClicked(event)) {
      this.closeMenu();
    }
  }

  private isToggleButtonClicked(event: Event): boolean {
    return (event.target as HTMLElement).closest('button') === this.toggleButton.nativeElement;
  }

  private isMenuClicked(event: Event): boolean {
    return event.target === this.menu.nativeElement;
  }

  private toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.shouldAnimate = true;

    this.triggerChangeDetection();
    this.resetAnimationAfterDelay();
  }

  private closeMenu(): void {
    this.isMenuOpen = false;

    this.triggerChangeDetection();
    this.resetAnimationAfterDelay();
  }

  private triggerChangeDetection(): void {
    this.changeDetectorRef.detectChanges();
  }

  private resetAnimationAfterDelay(): void {
    this.numberOfTimeouts++;

    setTimeout(() => {
      if (this.numberOfTimeouts === 1) {
        this.shouldAnimate = false;
        this.triggerChangeDetection();
      }
      this.numberOfTimeouts--;
    }, this.ANIMATION_DURATION_MS);
  }
}
