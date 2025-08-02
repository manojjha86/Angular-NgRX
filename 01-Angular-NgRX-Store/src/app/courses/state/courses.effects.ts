import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createCourse, createCourseSuccess, deleteCourse, deleteCourseSuccess, readCourses, readCoursesSuccess, updateCourse, updateCourseSuccess } from "./courses.actions";
import { catchError, filter, map, mergeMap, of, switchMap } from "rxjs";
import { CourseService } from "../services/course.service";
import { Course } from "src/app/models/course.model";
import { setErrorMessage, setIsLoading } from "src/app/shared/shared.actions";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { ROUTER_NAVIGATED, RouterNavigatedAction } from "@ngrx/router-store";

@Injectable()
export class CoursesEffect{
    constructor(
        private actions$: Actions,
        private courseService: CourseService,
        private store: Store<AppState>
    ){}

    createCourse$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createCourse),
            mergeMap((action) => {
                this.store.dispatch(setIsLoading({ value: true}));
                return this.courseService.createCourse(action.course).pipe(
                    map((data) => {
                        this.store.dispatch(setIsLoading({ value: false}));
                        const course: Course = { ...action.course, id: data.name}
                        return createCourseSuccess({ course })
                    }),
                    catchError((error) => {
                        this.store.dispatch(setIsLoading({ value: false}));
                        const message = 'Something went wrong. Course cannot be created.'
                        return of(setErrorMessage({ message }))
                    })
                )
            })
        )
    });

    readCourses$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(readCourses),
            mergeMap((action) => {
                this.store.dispatch(setIsLoading({ value: true}));
                return this.courseService.readCourses().pipe(
                    map((data) => {
                        this.store.dispatch(setIsLoading({ value: false}));
                        return readCoursesSuccess({ courses: data})
                    }),
                    catchError((error) => {
                        this.store.dispatch(setIsLoading({ value: false}));
                        const message = 'Something went wrong. Cannot fetch all courses.'
                        return of(setErrorMessage({ message }))
                    })
                )
            })
        )
    })

    updateCourse$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateCourse),
            mergeMap((action) => {
                return this.courseService.updateCourse(action.course).pipe(
                    map((data) => {
                        return updateCourseSuccess({ course: action.course})
                    }),
                    catchError((error) => {
                        this.store.dispatch(setIsLoading({ value: false}));
                        const message = 'Something went wrong. Cannot update the course.'
                        return of(setErrorMessage({ message }))
                    })
                )
            })
        )
    });

    deleteCourse$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteCourse),
            mergeMap((action) => {
                return this.courseService.deleteCourse(action.id).pipe(
                    map((data) => {
                        return deleteCourseSuccess({ id: action.id});
                    }),
                    catchError((error) => {
                        this.store.dispatch(setIsLoading({ value: false}));
                        const message = 'Something went wrong. Cannot delete the course.'
                        return of(setErrorMessage({ message }))
                    })
                )
            })
        )
    })

    getCourseById$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            filter((r: RouterNavigatedAction) => {
                return r.payload.routerState.url.startsWith('/courses/course/')
            }),
            map((r: RouterNavigatedAction) => {
                return r.payload.routerState['params']['id'];
            }),
            switchMap((id) => {
                return this.courseService.getCourseById(id)
                    .pipe(
                        map((course) => {
                            const courseData = [{ ...course, id}]
                            return readCoursesSuccess({ courses: courseData})
                        })
                    );
            })
        )
    })
}