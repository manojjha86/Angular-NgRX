import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthResponse } from "src/app/models/auth-response.model";
import { User } from "src/app/models/user.model";
import { AppState } from "src/app/store/app.state";
import { logout } from "../states/auth.actions";
import { environments } from "src/enviroments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    constructor(
        private http: HttpClient,
        private store: Store<AppState>
    ){}

    timer: any;

    login(email: string, password: string): Observable<AuthResponse>{
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environments.firebaseConfig.apiKey}`;
        const body = {
            email,
            password,
            returnSecureToken: true 
        }
        return this.http.post<AuthResponse>(url, body);
    }

    signup(email: string, password: string): Observable<AuthResponse>{
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environments.firebaseConfig.apiKey}`;
        const body = {
            email,
            password,
            returnSecureToken: true
        }
        return this.http.post<AuthResponse>(url, body);
    }

    getErrorMessage(errorResponse: HttpErrorResponse){
        let message = 'An unknown error has occured.';

        if(!errorResponse.error || !errorResponse.error.error){
            console.log(errorResponse);
            return message;
        }
        switch(errorResponse.error.error.message){
            case 'INVALID_LOGIN_CREDENTIALS':
                message='The email or Password is incorrect';
                break;
            case 'EMAIL_NOT_FOUND':
                message = 'This email does not exist.';
                break;
            case 'INVALID_PASSWORD':
                message = 'This password is not correct.';
                break;
            case 'USER_DISABLED':
                message = 'This user has been disabled.';
                break;
            case 'EMAIL_EXISTS':
                message = 'A User with the given email already exists.';
                break;
            default:
                message = errorResponse.error.error.message
        }

        return message;
    }

    formatUserData(response: AuthResponse){
        const expirationTimestamp = Date.now() + (+response.expiresIn * 1000)
        const formattedUser: User = {
            accessToken: response.idToken,
            email: response.email,
            expiresAt: expirationTimestamp,
            userId: response.localId
        }

        return formattedUser;
    }

    saveUserInLocalStorage(user: User){
        try{
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.autoLogoutUser(user);
        }catch(error){
            console.log('Error saving user data to local storage', error);
        }
    }

    readUserFromLocalStorage(){
        try{
            const loggedUser = localStorage.getItem('currentUser');

            if(!loggedUser){
                return null;
            }
            const user: User = JSON.parse(loggedUser)

            if(user.expiresAt <= Date.now()){
                localStorage.removeItem('currentUser');
                return null;
            }
            return user;

        }catch(error){
            localStorage.removeItem('currentUser');
            return null;
        }
    }

    logout(){
        localStorage.removeItem('currentUser');

        if(this.timer){
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    autoLogoutUser(user: User){
        const interval = user.expiresAt - Date.now();
        console.log(interval);
        this.timer = setTimeout(() => {
            this.store.dispatch(logout())
        }, interval)
    }
}