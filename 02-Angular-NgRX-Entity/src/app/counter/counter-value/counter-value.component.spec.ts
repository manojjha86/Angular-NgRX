import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterValueComponent } from './counter-value.component';

describe('CounterValueComponent', () => {
  let component: CounterValueComponent;
  let fixture: ComponentFixture<CounterValueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CounterValueComponent]
    });
    fixture = TestBed.createComponent(CounterValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
