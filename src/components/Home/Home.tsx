import * as React from "react";
import "./Home.css"
import { useDispatch, useSelector } from "react-redux";
import { getUsers, GetUsersSortOptions } from "../../actions";
import { StateTyping } from "../../reducers";
import { UserItem } from "../../util/mapJson";
import { NavBar } from "../NavBar/NavBar";
import { UserItemC } from "../UserItemC/UserItemC";

export function Home() {
    const dispatch = useDispatch();
    const items = useSelector<StateTyping, UserItem[]>((state) => state.userItems);

    React.useEffect(() => {
        dispatch(getUsers(GetUsersSortOptions.USERNAME, 0, 5));
    }, []);

    return (
        <>
            <NavBar />
            <div className="home-page">
            <span className="home-page__title">Home</span>
            <div className="home-page__users">
                    {items.map((val) => {
                        return (
                            <UserItemC key={val.id} item={val} />
                        );
                    })}
                </div>

            </div>
        </>
    );
}
