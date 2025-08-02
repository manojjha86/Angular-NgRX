import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
]

@NgModule({
    declarations: [
    LoginComponent,
    SignupComponent
  ],
    imports: [
      CommonModule, 
      ReactiveFormsModule,
      RouterModule.forChild(routes)],
    exports: []
})
export class AuthModule{

}