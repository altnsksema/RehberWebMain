import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KisilistesiComponent } from './kisilistesi.component';

describe('KisilistesiComponent', () => {
  let component: KisilistesiComponent;
  let fixture: ComponentFixture<KisilistesiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KisilistesiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KisilistesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
