import * as React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions";

import "./NavBar.css"

export function NavBar() {
    const dispatch = useDispatch();

    return (
        <div className="navbar">
            <span className="navbar__logout"
                onClick={() => dispatch(logout())}>
                Выйти
            </span>
        </div>
    );
}