import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Course } from "src/app/models/course.model";

@Injectable({
    providedIn: 'root'
})
export class CourseEntityService extends EntityCollectionServiceBase<Course>{
    constructor(ecsef: EntityCollectionServiceElementsFactory){
        super('Course', ecsef);
    }
}