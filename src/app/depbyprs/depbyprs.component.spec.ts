import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepbyprsComponent } from './depbyprs.component';

describe('DepbyprsComponent', () => {
  let component: DepbyprsComponent;
  let fixture: ComponentFixture<DepbyprsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepbyprsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepbyprsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
