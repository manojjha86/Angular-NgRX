import { createAction, props } from "@ngrx/store";
import { Course } from "src/app/models/course.model";

export const showForm = createAction('[courses] show form', props<{value: boolean}>());

export const createCourse = createAction(
    '[courses] create course', 
    props<{ course: Course}>()
);
export const createCourseSuccess = createAction(
    '[courses] create course success',
    props<{ course: Course}>()
)

export const readCourses = createAction(
    '[courses] read courses'
)
export const readCoursesSuccess = createAction(
    '[courses] read courses success',
    props<{ courses: Course[]}>()
)

export const updateCourse = createAction('[courses]update course', 
    props<{ course: Course}>()
)
export const updateCourseSuccess = createAction('[courses] update course success', 
    props<{ course: Course}>()
)

export const deleteCourse = createAction('[courses] delete course', 
    props<{ id: string}>()
)
export const deleteCourseSuccess = createAction('[courses] delete course success', 
    props<{ id: string}>()
)