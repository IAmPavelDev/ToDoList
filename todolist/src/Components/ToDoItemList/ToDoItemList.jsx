import React from "react";
import style from "./ToDoItemList.module.scss";
import ToDoItem from "../ToDoItem/ToDoItem";
import { useSelector } from "react-redux";

export default function ToDoItemList() {
    const list = [];
    let items = useSelector((state) => state);

    for (let item of items) {
        list.push(
            <ToDoItem
                inputName={item.name}
                inputMain={item.main}
                numberInList={items.indexOf(item)}
                key={items.indexOf(item)}
            />
        );
    }

    return <div className={style.list__wrapper}>{list}</div>;
}
