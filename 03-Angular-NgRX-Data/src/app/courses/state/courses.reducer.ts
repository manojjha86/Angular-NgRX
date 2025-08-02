import { createReducer, on } from "@ngrx/store";
import { initialState } from "./courses.state";
import { showForm } from "./courses.actions";

export const coursesReducer = createReducer(
    initialState,
    on(showForm, (state, action) => {
        return {
            ...state,
            showForm: action.value
        }
    }),
)