import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { authReducer } from "../auth/states/auth.reducer";
import { AuthState } from "../auth/states/auth.state";
import { sharedReducer } from "../shared/shared.reducer";
import { SharedState } from "../shared/shared.state";
import { ActionReducer, MetaReducer } from "@ngrx/store";
import { environments } from "src/enviroments/environment";

export interface AppState{
    auth: AuthState,
    shared: SharedState,
    router: RouterReducerState
}

export const appReducer = {
    auth: authReducer,
    shared: sharedReducer,
    router: routerReducer
}

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
        console.log("state before: ", state);
        console.log("action: ", action);

        return reducer(state, action);
    }
}

// export const metaReducers: MetaReducer<AppState>[] = 
//     environments.mode !== 'production' ? [logger] : [];

export const metaReducers: MetaReducer<AppState>[] = [];