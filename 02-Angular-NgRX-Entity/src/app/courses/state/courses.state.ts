import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Course } from "src/app/models/course.model";
import { showForm } from "./courses.actions";

export const courseAdapter = createEntityAdapter<Course>({
    selectId: (course: Course) => course.id,
    sortComparer: sortByTitle
});

export interface CoursesState extends EntityState<Course> {
    showForm: boolean,
    loaded: boolean
}

export const initialState: CoursesState = courseAdapter.getInitialState({
    showForm: false,
    loaded: false
});

export function sortByTitle(a: Course, b: Course): number {
  return b.title.localeCompare(a.title);
}