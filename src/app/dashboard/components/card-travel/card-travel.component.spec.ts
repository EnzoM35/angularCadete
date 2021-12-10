import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTravelComponent } from './card-travel.component';

describe('CardTravelComponent', () => {
  let component: CardTravelComponent;
  let fixture: ComponentFixture<CardTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
