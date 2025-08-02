import { Course } from "src/app/models/course.model"

export interface CoursesState {
    courses: Course[],
    showForm: boolean,
}

export const initialState: CoursesState = {
    courses: [],
    showForm: false,
}