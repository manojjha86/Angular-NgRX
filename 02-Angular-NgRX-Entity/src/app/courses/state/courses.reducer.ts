import { createReducer, on } from "@ngrx/store";
import { initialState } from "./courses.state";
import { courseAdapter } from "./courses.state";
import { createCourseSuccess, deleteCourseSuccess, readCoursesSuccess, showForm, updateCourseSuccess } from "./courses.actions";

export const coursesReducer = createReducer(
    initialState,
    on(showForm, (state, action) => {
        return {
            ...state,
            showForm: action.value
        }
    }),
    on(createCourseSuccess, (state, action) => {
        return courseAdapter.addOne(action.course, state);
    }),
    on(updateCourseSuccess, (state, action) => {
        return courseAdapter.updateOne(action.course, state);
    }),
    on(deleteCourseSuccess, (state, action) => {
        return courseAdapter.removeOne(action.id, state)
    }),
    on(readCoursesSuccess, (state, action) => {
        return courseAdapter.setAll(action.courses, { ...state, loaded: true});
    })
)