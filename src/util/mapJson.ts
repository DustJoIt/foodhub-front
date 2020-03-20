export interface LoginSuccessAnswer {
    username: string;
    token: string;
}

export interface LoginFailureAnswer {
    message: string;
}

export enum UserRoleStatus {
    ACTIVE = "ACTIVE"
}

export interface UserRoles {
    created: string;
    id: string;
    name: string;
    status: UserRoleStatus;
    updated: string;
}

export enum UserStatus {
    ACTIVE = "ACTIVE",
    DELETED = "DELETED"
}

export interface UserItem {
    // Date? 
    created: string;
    email: string;
    firstname: string;
    id: string;
    lastname: string;
    password: string;
    roles: UserRoles[];
    status: UserStatus;
    update: string;
}

export interface GetUsersAnswers {
    count: number;
    items: UserItem[];
}

export function mapGetUsers(resp: GetUsersAnswers) {
    return resp.items;
}
