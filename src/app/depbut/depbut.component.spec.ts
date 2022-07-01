import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepbutComponent } from './depbut.component';

describe('DepbutComponent', () => {
  let component: DepbutComponent;
  let fixture: ComponentFixture<DepbutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepbutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepbutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
