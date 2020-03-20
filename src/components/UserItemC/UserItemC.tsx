import * as React from "react";
import { UserItem } from "../../util/mapJson";
import "./UserItemC.css";

export interface UserItemProps {
    item: UserItem
}

export function UserItemC({ item }: UserItemProps) {
    return (
        <div className="home-page__user">
            <div className="home-page__user-name">{item.firstname + " " + item.lastname}</div>
            <div className="home-page__user-status">{item.status}</div>
        </div>
    )
}