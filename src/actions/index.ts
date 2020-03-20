import { RouterAction } from "connected-react-router";
import { UserItem } from "../util/mapJson";

export const LOGIN_ATTEMPT = "LOGIN_ATTEMPT";
export type LOGIN_ATTEMPT = typeof LOGIN_ATTEMPT;

export interface LoginAttemptAction {
    type: LOGIN_ATTEMPT;
    username: string;
    password: string;
}

export const loginAttempt = (
    username: string,
    password: string
): LoginAttemptAction => ({
    type: LOGIN_ATTEMPT,
    username,
    password
});

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;

export interface LoginSuccessAction {
    type: LOGIN_SUCCESS;
    username: string;
}

export const loginSuccess = (username: string): LoginSuccessAction => ({
    type: LOGIN_SUCCESS,
    username
});

export const LOGIN_FAILURE = "LOGIN_FAILURE";
export type LOGIN_FAILURE = typeof LOGIN_FAILURE;

export interface LoginFailureAction {
    type: LOGIN_FAILURE;
    message: string;
}

export const loginFailure = (message: string): LoginFailureAction => ({
    type: LOGIN_FAILURE,
    message
});

export const LOGOUT = "LOGOUT";
export type LOGOUT = typeof LOGOUT;

export interface LogoutAction {
    type: LOGOUT;
}

export const logout = (): LogoutAction => ({
    type: LOGOUT,
});


export const GET_USERS = "GET_USERS";
export type GET_USERS = typeof GET_USERS;

export enum GetUsersSortOptions {
    FIRSTNAME = "firstname",
    USERNAME = "username"
}

export interface GetUsersAction {
    type: GET_USERS;
    sort: GetUsersSortOptions;
    page: number;
    size: number;
}

export const getUsers = (
    sort: GetUsersSortOptions,
    page: number,
    size: number
) => ({
    type: GET_USERS,
    sort,
    page,
    size
});

export const SET_USERS = "SET_USERS";
export type SET_USERS = typeof SET_USERS;

export interface SetUsersAction {
    type: SET_USERS;
    items: UserItem[];
}

export const setUsers = (items: UserItem[]): SetUsersAction => ({
    type: SET_USERS,
    items
});

export const GET_USER_BY_TOKEN = "GET_USER_BY_TOKEN";
export type GET_USER_BY_TOKEN = typeof GET_USER_BY_TOKEN;

export interface GetUserByTokenAction {
    type: GET_USER_BY_TOKEN;
    token: string;
}

export const getUserByToken = (token: string): GetUserByTokenAction => ({
    type: GET_USER_BY_TOKEN,
    token
});

export type Actions =
    | RouterAction
    | LoginAttemptAction
    | LoginSuccessAction
    | LoginFailureAction
    | GetUsersAction
    | SetUsersAction
    | GetUserByTokenAction
    | LogoutAction;
