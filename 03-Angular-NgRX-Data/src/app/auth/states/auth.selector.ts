import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AUTH_STATE } from "src/app/constants";
import { AuthState } from "./auth.state";

const authFeatureSelector = createFeatureSelector<AuthState>(AUTH_STATE);

export const getLoggedUser = createSelector(
    authFeatureSelector, 
    (state) => {
        return state.user
    }
)

export const getAccessToken = createSelector(
    authFeatureSelector,
    (state) => {
        return state.user?.accessToken;
    }

)