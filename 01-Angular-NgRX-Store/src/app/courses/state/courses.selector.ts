import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./courses.state";
import { COURSES_STATE } from "src/app/constants";
import { getQueryParams, getRouterParams } from "src/app/store/router/router.selector";
import { Params } from "@angular/router";

const getCoursesState = createFeatureSelector<CoursesState>(COURSES_STATE);

export const getCourses = createSelector(getCoursesState, (state) => {
    return state.courses;
})

export const getShowForm = createSelector(getCoursesState, (state) => {
    return state.showForm;
})

export const getCourseByIdParams = createSelector(
    getCoursesState,
    getRouterParams,
    (state, params: Params) => {
        return state.courses.find(course => course.id === params['id']);
    }
)

export const getCourseByIdQueryParams = createSelector(
    getCoursesState,
    getQueryParams,
    (state, params: Params) => {
        return state.courses.find(course => course.id === params['id']);
    }
)