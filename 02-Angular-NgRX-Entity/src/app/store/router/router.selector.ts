import { RouterReducerState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "./custom-serializer";

const getRouterState= createFeatureSelector<RouterReducerState<RouterStateUrl>>('router')

export const getRouterParams = createSelector(
    getRouterState,
    (router) => {
        return router.state.params;
    }
)

export const getQueryParams = createSelector(
    getRouterState,
    (router) => {
        return router.state.queryParams;
    }
)

export const getRouterUrl = createSelector(
    getRouterState,
    (router) => {
        return router.state.url;
    }
)