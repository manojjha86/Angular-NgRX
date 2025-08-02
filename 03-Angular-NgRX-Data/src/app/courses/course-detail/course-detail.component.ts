import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { exhaustMap, Observable, of } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { AppState } from 'src/app/store/app.state';
import { getRouterParams } from 'src/app/store/router/router.selector';
import { CourseEntityService } from '../services/course-entity.service';
//import { getCourseByIdParams } from '../state/courses.selector';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private courseEntityService: CourseEntityService
  ){}

  id: string | null= null;
  selectedCourse$: Observable<Course> | null = null;

  ngOnInit(): void {
    this.store.select(getRouterParams).subscribe((routeParams) => {
      const id = routeParams['id'];
      this.selectedCourse$ = this.courseEntityService.entities$.pipe(
        exhaustMap(courses => {
          const selectedCourse = courses.find(c => c.id === id);
          return of(selectedCourse)
        })
      )
    });
  }

  OnBackToCourses(){
    this.router.navigate(['courses']);
  }
}
