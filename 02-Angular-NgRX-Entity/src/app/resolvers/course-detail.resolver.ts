import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Store } from "@ngrx/store";
import { CourseService } from "../courses/services/course.service";
import { getRouterParams } from "../store/router/router.selector";
import { catchError, map, of, switchMap, take } from "rxjs";
import { getCourses } from "../courses/state/courses.selector";
import { createCourseSuccess } from "../courses/state/courses.actions";

export const courseDetailResolver: ResolveFn<boolean> = () => {
    const store: Store = inject(Store);
    const courseSerice: CourseService = inject(CourseService);

    return store.select(getRouterParams).pipe(
        take(1),
        switchMap(params => {
            const id = params['id'];

            //Id router param does not exist - return false
            if(!id){
                return of(false);
            }
            //id route param exist - read all courses using id
            return store.select(getCourses).pipe(
                take(1),
                switchMap(courses => {
                    if(courses.find( c => c.id === id)){
                        //course alsready exist in the store
                        return of(true);
                    } else {
                        //course doen not exist in the store
                        return courseSerice.getCourseById(id).pipe(
                            map(course => {
                                store.dispatch(createCourseSuccess({ course: {...course, id}}));
                                return true;
                            }),
                            catchError(error => {
                                return of(false);
                            })
                        )
                    }
                })
            )

        })
    )
}