import { useState, useEffect, useReducer } from "react";
import ToDoItemCreate from "./Components/ToDoItemCreate/ToDoItemCreate";
import ToDoItemList from "./Components/ToDoItemList/ToDoItemList";
import Auth from "./Components/Auth/Auth";
import style from "./App.module.scss";
import itemsSync from "./server/sync";
import { useDispatch } from "react-redux";
import { ItemPostAction } from "./store/ToDoItemsReducer";

function App() {
    const [isAuth, setIsAuth] = useState(false); //true = light, false = dark

    function themeReducer(state) {
        return state === "white" ? "black" : "white";
    }

    const [stateColour, dispatchColour] = useReducer(themeReducer, "white");

    const dispatch = useDispatch();
    const sync = new itemsSync();
    const Authorize = async (total) => {
        const items = await sync.getItems();
        items.rows.map((item) => {
            return dispatch(ItemPostAction(item));
        });
        setIsAuth(total);
    };

    useEffect(() => {
        console.log(stateColour);
        document.querySelector("*").style.backgroundColor = stateColour;
    }, [stateColour]);
    return (
        <div
            style={{ backgroundColor: stateColour }}
            className={style.app__wrapper}
        >
            {!isAuth ? (
                <Auth colourMode={stateColour} setColourMode={dispatchColour} setIsAuth={Authorize} />
            ) : (
                <>
                    <ToDoItemCreate
                        colourMode={stateColour}
                        setColourMode={dispatchColour}
                    />
                    <ToDoItemList colourMode={stateColour} />
                </>
            )}
        </div>
    );
}

export default App;
