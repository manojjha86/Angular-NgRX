import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import { getErrorMessage, getIsLoading } from './shared/shared.selector';
import { autoLogin } from './auth/states/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Angular_NgRX';
  showLoading$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.showLoading$ = this.store.select(getIsLoading);
    this.errorMessage$ = this.store.select(getErrorMessage);
    this.store.dispatch(autoLogin())
  }
}
