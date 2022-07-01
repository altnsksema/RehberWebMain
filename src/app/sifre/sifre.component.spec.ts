import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SifreComponent } from './sifre.component';

describe('SifreComponent', () => {
  let component: SifreComponent;
  let fixture: ComponentFixture<SifreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SifreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SifreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
