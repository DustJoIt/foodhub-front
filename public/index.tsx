import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";

import { HelloWorld } from "../src/components/HelloWorld/HelloWorld";
import { store } from "../src/reducers/";

export function Home() {
    return (
        <Provider store={store}>
            <HelloWorld />
        </Provider>
        // Починить нормально
    );
}

var mountNode = document.getElementById("app");
ReactDOM.render(<Home />, mountNode);
