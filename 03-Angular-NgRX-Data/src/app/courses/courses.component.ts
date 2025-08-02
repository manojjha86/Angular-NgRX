import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course.model';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { getShowForm } from './state/courses.selector';
import { Observable } from 'rxjs';
import { showForm } from './state/courses.actions';
import { Router } from '@angular/router';
import { CourseEntityService } from './services/course-entity.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]> | null = null;
  showForm$: Observable<boolean> | null = null;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private courseEntityService: CourseEntityService
  ){}

  ngOnInit(){
    this.showForm$ = this.store.select(getShowForm);
    this.courses$ = this.courseEntityService.entities$;
  }
  showCreateForm(){
    this.router.navigateByUrl('courses?edit=false');
    this.store.dispatch(showForm({value: true}));
  }
}
