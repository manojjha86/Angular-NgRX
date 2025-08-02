import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

export const loginStart = createAction('[auth] login start', 
        props<{email: string, password: string}>()
)

export const loginSuccess = createAction('[auth] login success', 
    props<{ user: User, redirect: boolean}>()
)

export const signupStart = createAction('[auth] signup start', 
        props<{email: string, password: string}>()
)

export const signupSuccess = createAction('[auth] signup success', 
    props<{ user: User, redirect: boolean}>()
)

export const autoLogin = createAction(
    '[auth] auto login'
)

export const logout = createAction('[auth] logout');