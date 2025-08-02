import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState } from "./counter.state";
import { COUNTER_STATE } from "src/app/constants";

const getCounterState = createFeatureSelector<CounterState>(COUNTER_STATE);

export const getCounter = createSelector(getCounterState, (state) => {
    return state.counter;
})

export const getToggle = createSelector(getCounterState, (state) => {
    return state.toggle;
})