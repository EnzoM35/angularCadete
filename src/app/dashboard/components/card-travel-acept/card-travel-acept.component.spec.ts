import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTravelAceptComponent } from './card-travel-acept.component';

describe('CardTravelAceptComponent', () => {
  let component: CardTravelAceptComponent;
  let fixture: ComponentFixture<CardTravelAceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardTravelAceptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTravelAceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
