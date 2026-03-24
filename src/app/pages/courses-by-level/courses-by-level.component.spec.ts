import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesByLevelComponent } from './courses-by-level.component';

describe('CoursesByLevelComponent', () => {
  let component: CoursesByLevelComponent;
  let fixture: ComponentFixture<CoursesByLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesByLevelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursesByLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
