import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCourseComponent } from './dialog-course.component';

describe('DialogCourseComponent', () => {
  let component: DialogCourseComponent;
  let fixture: ComponentFixture<DialogCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
