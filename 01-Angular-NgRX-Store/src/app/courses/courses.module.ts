import { NgModule } from "@angular/core";
import { CoursesComponent } from "./courses.component";
import { CourseCardComponent } from "./course-card/course-card.component";
import { AddCourseComponent } from "./add-course/add-course.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { coursesReducer } from "./state/courses.reducer";
import { COURSES_STATE } from "../constants";
import { EffectsModule } from "@ngrx/effects";
import { CoursesEffect } from "./state/courses.effects";
import { authGuard } from "../auth/services/auth.guard";
import { CourseDetailComponent } from './course-detail/course-detail.component';

const routes: Routes = [
    { path: '', component: CoursesComponent, canActivate: [authGuard]},
    { path: 'course/:id', component: CourseDetailComponent, canActivate: [authGuard]}
]

@NgModule({
    declarations: [
        CoursesComponent,
        CourseCardComponent,
        AddCourseComponent,
        CourseDetailComponent
    ],
    imports: [ 
        CommonModule, 
        ReactiveFormsModule,
        EffectsModule.forFeature([CoursesEffect]),
        RouterModule.forChild(routes),
        StoreModule.forFeature(COURSES_STATE, coursesReducer)
    ],
    exports: []
})
export class CoursesModule {

}