import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { SettingsMenuComponent } from './settings-menu.component';
import { CalculationBase } from '../../model/person.model';

describe('SettingsMenuComponent', () => {
  let component: SettingsMenuComponent;
  let fixture: ComponentFixture<SettingsMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsMenuComponent],
      providers: [
        { provide: ChangeDetectorRef, useValue: { detectChanges: jasmine.createSpy('detectChanges') } }
      ]
    });

    fixture = TestBed.createComponent(SettingsMenuComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('changeCalculationBase', () => {
    it('should emit calculationBaseChanged', () => {
      spyOn(component.calculationBaseChanged, 'emit');
      const newCalculationBase: CalculationBase = 'mass';
      const event = new Event('click');

      component.changeCalculationBase(event, newCalculationBase);

      expect(component.calculationBaseChanged.emit).toHaveBeenCalledWith(newCalculationBase);
    });
  });

  describe('onWindowClick', () => {
    it('should close the menu when clicking outside', () => {
      component.isMenuOpen = true;
      component.menu = { nativeElement: document.createElement('div') };
      const event = new MouseEvent('click', { bubbles: true });

      spyOn<any>(component, 'isToggleButtonClicked').and.returnValue(false);
      spyOn<any>(component, 'isMenuClicked').and.returnValue(false);
      spyOn<any>(component['changeDetectorRef'], 'detectChanges');

      component['onWindowClick'](event);

      expect(component.isMenuOpen).toBe(false);
      expect(component['changeDetectorRef'].detectChanges).toHaveBeenCalled();
    });
  });

  describe('toggleMenu', () => {
    it('should toggle the menu open and closed', () => {
      spyOn<any>(component['changeDetectorRef'], 'detectChanges');
      expect(component.isMenuOpen).toBe(false);
      expect(component.shouldAnimate).toBe(false);

      component['toggleMenu']();
      expect(component.isMenuOpen).toBe(true);
      expect(component.shouldAnimate).toBe(true);

      component['toggleMenu']();
      expect(component.isMenuOpen).toBe(false);
      expect(component.shouldAnimate).toBe(true);

      expect(component['changeDetectorRef'].detectChanges).toHaveBeenCalledTimes(2);
    });
  });

  describe('resetAnimationAfterDelay', () => {
    it('should reset animation after delay', fakeAsync(() => {
      component.shouldAnimate = true;
      expect(component.shouldAnimate).toBe(true);

      component['toggleMenu']();
      tick(component['ANIMATION_DURATION_MS']);

      expect(component.shouldAnimate).toBe(false);
    }));
  });
});
