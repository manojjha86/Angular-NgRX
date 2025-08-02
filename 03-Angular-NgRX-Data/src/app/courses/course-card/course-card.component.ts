import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Course } from 'src/app/models/course.model';
import { AppState } from 'src/app/store/app.state';
import { showForm } from '../state/courses.actions';
import { Router } from '@angular/router';
import { CourseEntityService } from '../services/course-entity.service';


@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent{
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private courseEntityService: CourseEntityService
  ){}

  @Input() course: Course | null = null;

  onCourseEdit(){
    this.store.dispatch(showForm({ value: true }))
    this.router.navigateByUrl(`/courses?id=${this.course.id}&edit=true`)
  }

  onDeleteClicked(){
    const doDelete = confirm('Do you really want to delete this course?');
    if(doDelete){
      this.courseEntityService.delete(this.course.id);
    }    
  }

  showDetailsClicked(){
    this.router.navigate(['courses', 'course', this.course.id])
  }
}
