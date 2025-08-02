import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { signupStart } from '../states/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    })
  }

  onSignup(){
    const { email, password } = this.signupForm.value;
    this.store.dispatch(signupStart({email, password}));
  }


  validateEmail(){
    const emailControl = this.signupForm.get('email');
    if(emailControl.touched && !emailControl.valid){
      if(emailControl.errors['required']){
        return 'Email is a required field.';
      }
      if(emailControl.errors['email']){
        return 'Email is not valid.';
      }
    }
    return '';
  }

  validatePassword(){
    const pswdControl = this.signupForm.get('password');
    if(pswdControl.touched && !pswdControl.valid){
      if(pswdControl.errors['required']){
        return 'Password is a required field.';
      }
    }
    return '';
  }
}
