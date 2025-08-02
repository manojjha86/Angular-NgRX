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
import { authGuard } from "../auth/services/auth.guard";
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { coursesResolver } from "../resolvers/courses.resolver";
import { EntityDataModule, EntityDataService, EntityDefinitionService, EntityMetadataMap } from "@ngrx/data";
import { CourseDataService } from "./services/course-data.service";
import { Course } from "../models/course.model";
//import { courseDetailResolver } from "../resolvers/course-detail.resolver";

export function selectCourseId(course: Course){
    return course.id
}

function sortbyTitle(a: Course, b: Course){
    return b.title.localeCompare(a.title);
}

const entityMetadata: EntityMetadataMap = {
  Course: {
    selectId: selectCourseId,
    sortComparer: sortbyTitle,
    //entityName: 'Tutorial',
    entityDispatcherOptions: {
      optimisticUpdate: false,
      optimisticDelete: false
    }
  },
  Lesson: {}
};

const routes: Routes = [
    { 
        path: '', component: CoursesComponent, 
        canActivate: [authGuard],
        resolve: {
            resolver: coursesResolver
        }
    },
    { 
        path: 'course/:id', 
        component: CourseDetailComponent, 
        canActivate: [authGuard],
        resolve: {
            courseResolver: coursesResolver
        }
    }
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
        EffectsModule.forFeature([]),
        RouterModule.forChild(routes),
        StoreModule.forFeature(COURSES_STATE, coursesReducer),
    ],
    exports: [],
    providers: [
        CourseDataService
    ]
})
export class CoursesModule {
    constructor(
        eds: EntityDefinitionService,
        entityDataService: EntityDataService,
        courseDataService: CourseDataService
    ){
        eds.registerMetadataMap(entityMetadata);
        entityDataService.registerService('Course', courseDataService);
    }
}