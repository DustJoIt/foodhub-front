import { combineReducers, createStore } from "redux";
import { BasicActions, BASIC_SETUP } from "../actions";

export interface stateTyping {
    greeting: string;
}

const initialState = {
    greeting: "Guten Tag"
};

export const basicActionSetupReducer = (
    store: string = "Guten Tag",
    action: BasicActions
) => {
    console.log(action.type);
    switch (action.type) {
        case BASIC_SETUP:
            return action.hello;

        default:
            return store;
    }
};

export const rootState = combineReducers({ greeting: basicActionSetupReducer });

export const store = createStore(
    rootState,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
