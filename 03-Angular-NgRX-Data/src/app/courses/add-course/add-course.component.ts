import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { showForm } from '../state/courses.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//import { getCourseByIdQueryParams } from '../state/courses.selector';
import { Course } from 'src/app/models/course.model';
import { map, Subscription } from 'rxjs';
import { CourseService } from '../services/course.service';
import { getQueryParams } from 'src/app/store/router/router.selector';
import { CourseEntityService } from '../services/course-entity.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit, OnDestroy{

  courseForm: FormGroup;
  editMode: boolean = false;
  course: Course = null;
  courseId: string = '';
  selectedImage: File | null = null;

  editModeSubscription: Subscription;
  selectedCourseSunscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private courseService: CourseService,
    private courseEntityService: CourseEntityService
  ){}

  ngOnInit() {
    this.editModeSubscription = this.store.select(getQueryParams).subscribe((queryParams) => {
      this.editMode = JSON.parse(queryParams['edit']);
      this.courseId = queryParams['id'];
    })
    this.init();
    this.subscribeToSelectedcourse()
  }

  init(){
    this.courseForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100)
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(5000)
      ]),
      author: new FormControl(null, [
        Validators.required
      ]),
      price: new FormControl(null),
      image: new FormControl(null)
    })
  }

  subscribeToSelectedcourse(){
    // this.selectedCourseSunscription = this.store.select(getCourseByIdQueryParams).subscribe((data) => {
    //   this.course = data;
    // })   
    this.selectedCourseSunscription = this.courseEntityService.entities$.subscribe(courses => {
      this.course = courses.find(c => c.id === this.courseId);
    })
    if(this.editMode && this.course){
      this.courseForm.patchValue(this.course)
    }else{
      this.courseForm.reset();
    }
  }

  hideCreateForm(){
    this.store.dispatch(showForm({value: false}));
  }

  async onCreateOrUpdateCourse(){    
    if(!this.courseForm.valid){
      return;
    }
    if(this.editMode){
      const url = await this.courseService.uploadImage(this.selectedImage);
      const imagePath = url ? url : this.courseForm.value.image;
      this.courseForm.patchValue({ image: imagePath});

      const updatedCourse: Course = {
        id: this.course.id,
        title: this.courseForm.value.title,
        description: this.courseForm.value.description,
        author: this.courseForm.value.author,
        price: +this.courseForm.value.price,
        image: this.courseForm.value.image
      }

      this.courseEntityService.update(updatedCourse);
    }else{
      //Create a new course on button click
      const url = await this.courseService.uploadImage(this.selectedImage);
      this.courseForm.patchValue({ image: url });
      const course: Course = this.courseForm.value;
      this.courseEntityService.add(course);
    }
    this.store.dispatch(showForm({ value: false}));
  }

  showTitleValidationerrors(){
    const titleControl = this.courseForm.get('title');
    if(titleControl.touched && !titleControl.valid){
      if(titleControl.errors['required']){
        return 'Title is a required field.';
      }
      if(titleControl.errors['minlength']){
        return 'Title must be at least 6 charachters.';
      }
      if(titleControl.errors['maxlength']){
        return 'Title cannot be more than 100 charachters.';
      }
    }
    return '';
  }


  showDescriptionValidationerrors(){
    const descriptionControl = this.courseForm.get('description');
    if(descriptionControl.touched && !descriptionControl.valid){
      if(descriptionControl.errors['required']){
        return 'Description is a required field.';
      }
      if(descriptionControl.errors['minlength']){
        return 'Description must be at least 10 charachters.';
      }
      if(descriptionControl.errors['maxlength']){
        return 'Description cannot be more than 5000 charachters.';
      }
    }
    return '';
  }

  showAuthorValidationerrors(){
    const authorControl = this.courseForm.get('author');
    if(authorControl.touched && !authorControl.valid){
      if(authorControl.errors['required']){
        return 'Author is a required field.';
      }
    }
    return '';
  }

  onFileSelected(event: any){
    const file = event.target.files[0];
    if(file){
      this.selectedImage = file;
      const fileNameSpan = document.querySelector('.file-name');
      if(fileNameSpan){
        fileNameSpan.textContent = file.name;
      }
    }
  }

  ngOnDestroy(): void {
    this.editModeSubscription.unsubscribe();
    this.selectedCourseSunscription.unsubscribe();
  }
}
