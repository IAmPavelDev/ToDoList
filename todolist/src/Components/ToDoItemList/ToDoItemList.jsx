import React, { useEffect } from "react";
import style from "./ToDoItemList.module.scss";
import ToDoItem from "../ToDoItem/ToDoItem";
import { useSelector } from "react-redux";

export default function ToDoItemList({ colourMode }) {
    const list = [];
    let items = useSelector((state) => state);
    useEffect(() => {
        console.log(colourMode);
    }, [colourMode]);
    for (let item of items) {
        list.push(
            <ToDoItem
                inputName={item.name}
                inputMain={item.main}
                numberInList={items.indexOf(item)}
                key={items.indexOf(item)}
                colourMode={colourMode}
            />
        );
    }

    return <div style={{backgroundColor: colourMode}} className={style.list__wrapper}>{list}</div>;
}
