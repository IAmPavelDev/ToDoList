import ToDoItemCreate from "./Components/ToDoItemCreate/ToDoItemCreate";
import ToDoItemList from "./Components/ToDoItemList/ToDoItemList";
import Auth from "./Components/Auth/Auth";
import style from "./App.module.scss";
import { useState } from "react";
import itemsSync from "./server/sync";
import { useDispatch } from "react-redux";
import { ItemPostAction } from "./store/ToDoItemsReducer";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const dispatch = useDispatch();
    const sync = new itemsSync();
    const Authorize = async (total) => {
        const items = await sync.getItems();
        items.rows.map((item) => {
            return dispatch(ItemPostAction(item));
        });
        setIsAuth(total);
    };
    return (
        <div className={style.app__wrapper}>
            {!isAuth ? (
                <Auth setIsAuth={Authorize} />
            ) : (
                <>
                    <ToDoItemCreate />
                    <ToDoItemList />
                </>
            )}
        </div>
    );
}

export default App;
