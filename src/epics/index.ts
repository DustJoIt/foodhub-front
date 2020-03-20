import { Epic, ofType, combineEpics } from "redux-observable";
import {
    Actions,
    LOGIN_ATTEMPT,
    LoginAttemptAction,
    loginSuccess,
    loginFailure,
    LOGIN_SUCCESS,
    LoginSuccessAction,
    GET_USERS,
    GetUsersAction,
    setUsers,
    LOGOUT,
    LogoutAction
} from "../actions";
import { switchMap, map, catchError, filter, take } from "rxjs/operators";
import { StateTyping, LoginStatus } from "../reducers";
import { from, of, EMPTY } from "rxjs";
import { client } from "../util/WebClient";
import { LoginSuccessAnswer, mapGetUsers } from "../util/mapJson";
import {
    push,
    LOCATION_CHANGE,
    LocationChangeAction
} from "connected-react-router";

export const loginEpic: Epic<Actions, Actions, StateTyping> = action$ => {
    return action$.pipe(
        ofType<LoginAttemptAction>(LOGIN_ATTEMPT),
        switchMap(({ username, password }) =>
            from(
                client.fetch(
                    "http://localhost:8080/api/session/login",
                    {
                        method: "POST",
                        body: JSON.stringify({ username, password }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    },
                    (resp: LoginSuccessAnswer) => resp
                )
            ).pipe(
                map(response => {
                    client.setToken(response.token);
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("username", response.username);
                    return loginSuccess(response.username);
                })
            )
        ),
        catchError(error => {
            console.log(error, loginFailure(error.message));
            return of(loginFailure(error.message));
        })
    );
};

export const loginSuccessEpic: Epic<
    Actions,
    Actions,
    StateTyping
> = action$ => {
    return action$.pipe(
        ofType<LoginSuccessAction>(LOGIN_SUCCESS),
        switchMap(() => of(push("/home")))
    );
};

export const logoutEpic: Epic<Actions, Actions, StateTyping> = action$ => {
    return action$.pipe(
        ofType<LogoutAction>(LOGOUT),
        switchMap(() => {
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            return of(push("/login"));
        })
    );
};

export const routerEpic: Epic<Actions, Actions, StateTyping> = (
    action$,
    state$
) => {
    return action$.pipe(
        ofType<LocationChangeAction>(LOCATION_CHANGE),
        filter(action => action.payload.location.pathname != "/login"),
        switchMap(() => {
            const store = state$.value;

            if (store.authInfo.status == LoginStatus.LOADED) {
                return EMPTY;
            }

            return of(push("/login"));
        })
    );
};

export const initEpic: Epic<Actions, Actions, StateTyping> = action$ => {
    return action$.pipe(
        ofType<LocationChangeAction>(LOCATION_CHANGE),
        take(1),
        switchMap(() => {
            let token = localStorage.getItem("token");
            let user = localStorage.getItem("username");

            if (token && user) {
                client.setToken(token);
                return of(loginSuccess(user));
            }

            // Просроченный токен?
            return EMPTY;
        })
    );
};

export const getUsersEpic: Epic<Actions, Actions, StateTyping> = action$ => {
    return action$.pipe(
        ofType<GetUsersAction>(GET_USERS),
        switchMap(action => {
            return from(
                client.fetch(
                    `http://localhost:8080/api/user/all?page=${action.page}&sort=${action.sort}&size=${action.size}`,
                    {},
                    mapGetUsers
                )
            ).pipe(
                map(response => {
                    return setUsers(response);
                })
            );
        }),
        catchError(error => {
            console.log(error);
            return EMPTY;
        })
    );
};

export const rootEpic = combineEpics(
    loginEpic,
    loginSuccessEpic,
    routerEpic,
    initEpic,
    getUsersEpic,
    logoutEpic
);
