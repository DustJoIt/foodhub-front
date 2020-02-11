import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { StateTyping } from "../../reducers";
import "./HelloWorld.css";
import { basicSetupAction } from "../../actions";

export function HelloWorld() {
    const [count, setCount] = useState(0);
    const greeting = useSelector((state: StateTyping) => state.greeting);
    const dispatch = useDispatch();

    return (
        <div className="HelloWorld">
            <h1>{greeting}</h1>
            <p className="HelloWorld__p">Вы кликали {count} раз</p>
            <button
                onClick={() => {
                    dispatch(basicSetupAction("Hello!"));
                    setCount(count + 1);
                }}
            >
                Жмакай
            </button>
        </div>
    );
}
