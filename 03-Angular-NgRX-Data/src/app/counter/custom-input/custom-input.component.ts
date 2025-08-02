import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../states/counter.state';
import { customIncrement, toggleCustomInput } from '../states/counter.actions';
import { getToggle } from '../states/counter.selector';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent implements OnInit{
    constructor(
      private store: Store<AppState>
    ){}
    customValue: number = 0;
    showCustomInput$: Observable<boolean> | null = null;

    ngOnInit(){
      this.showCustomInput$ =this.store.select(getToggle);
    }

    onCustomValueButtonClicked(){
      this.store.dispatch(customIncrement({value: +this.customValue}));
    }

    onToggleClicked(){
      this.store.dispatch(toggleCustomInput())
    }
}
