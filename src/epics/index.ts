import { Epic, ofType, combineEpics } from "redux-observable";
import { BasicActions, BASIC_SETUP, basicSetupAction } from "../actions";
import { delay, map, filter } from "rxjs/operators";
import { StateTyping } from "../reducers";

export const basicEpic: Epic<BasicActions, BasicActions, StateTyping> = (
    action$,
    state$
) => {
    return action$.pipe(
        ofType(BASIC_SETUP),
        filter((action) => {
            return (action.hello != "Добрый вечер" )
        }),
        delay(1000),
        map(() => basicSetupAction("Добрый вечер"))
    );
};

export const rootEpic = combineEpics(
    basicEpic
)