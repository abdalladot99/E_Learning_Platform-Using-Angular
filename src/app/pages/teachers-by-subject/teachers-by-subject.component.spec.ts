import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersBySubjectComponent } from './teachers-by-subject.component';

describe('TeachersBySubjectComponent', () => {
  let component: TeachersBySubjectComponent;
  let fixture: ComponentFixture<TeachersBySubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeachersBySubjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeachersBySubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
