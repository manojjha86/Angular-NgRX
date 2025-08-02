import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course.model';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { getCourses, getShowForm } from './state/courses.selector';
import { Observable } from 'rxjs';
import { readCourses, showForm } from './state/courses.actions';
import { Router } from '@angular/router';

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
    private router: Router
  ){}

  ngOnInit(){
    this.courses$ = this.store.select(getCourses);
    this.showForm$ = this.store.select(getShowForm);
    this.store.dispatch(readCourses())
  }
  showCreateForm(){
    this.router.navigateByUrl('courses?edit=false');
    this.store.dispatch(showForm({value: true}));
  }
}
