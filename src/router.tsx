import * as React from "react";

import { Switch, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Home } from "./components/Home/Home";

export function Routes() {
    return (
        <Switch>
            <Route exact path="/login" component={Login}/>
            <Route  path="/" component={Home}/>
        </Switch>
    )
}