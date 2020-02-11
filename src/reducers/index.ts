import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { BasicActions, BASIC_SETUP } from "../actions";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "../epics";

export interface StateTyping {
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

const epicMiddleware = createEpicMiddleware<
    BasicActions,
    BasicActions,
    StateTyping
>();

const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore() {
    const store = createStore(
        rootState,
        composeEnhancers(applyMiddleware(epicMiddleware))
    );

    epicMiddleware.run(rootEpic);

    return store;
}
