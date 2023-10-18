import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypadComponent } from './keypad.component';

describe('KeypadComponent', () => {
  let component: KeypadComponent;
  let fixture: ComponentFixture<KeypadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeypadComponent]
    });
    fixture = TestBed.createComponent(KeypadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
