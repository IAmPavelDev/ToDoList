import React, { useRef, useState } from "react";
import style from "./ToDoItem.module.scss";

import { ItemDeleteAction } from "../../store/ToDoItemsReducer";
import { useDispatch } from "react-redux";

import {
    MdOutlineEditOff,
    MdOutlineModeEditOutline,
    MdDeleteForever,
} from "react-icons/md";
import { useEffect } from "react";

export default function ToDoItem({
    inputName,
    inputMain,
    numberInList,
    colourMode,
}) {
    const dispatch = useDispatch();

    const [isEditable, setIsEditable] = useState(false);

    function Field(data, placeholder, styleClass) {
        const fieldRef = useRef(null);
        function setDefaultField() {
            if (fieldRef.current.innerText === "") {
                fieldRef.current.innerText = placeholder;
                fieldRef.current.style.color =
                    colourMode === "white" ? "black" : "white";
                fieldRef.current.style.opacity = ".7";
            }
        }
        useEffect(() => {
            setDefaultField();
        });
        return (
            <div
                ref={fieldRef}
                className={styleClass}
                contentEditable={isEditable ? "true" : "inherit"}
                suppressContentEditableWarning={true}
                onClick={() => {
                    if (
                        fieldRef.current.innerText === placeholder &&
                        isEditable
                    ) {
                        fieldRef.current.innerText = " ";
                        fieldRef.current.style.color =
                            colourMode === "white" ? "black" : "white";

                        fieldRef.current.style.opacity = "1";
                    }
                }}
                onBlur={setDefaultField}
                style={{
                    backgroundColor: colourMode,
                    color: colourMode === "white" ? "black" : "white",
                    borderColor: colourMode === "white" ? "black" : "white",
                }}
            >
                {data}
            </div>
        );
    }
    return (
        <>
            <div
                style={{
                    backgroundColor: colourMode,
                    color: colourMode === "white" ? "black" : "white",
                    borderColor: colourMode === "white" ? "black" : "white",
                }}
                className={style.ToDoItem__wrapper}
            >
                <div style={{
                        backgroundColor: colourMode,
                    }} className={style.ToDoItem__wrapper__data_number}>
                    #{numberInList + 1}
                </div>
                <div
                    style={{
                        backgroundColor: colourMode,
                    }}
                    className={style.ToDoItem__wrapper__data}
                >
                    {Field(
                        inputName,
                        "name",
                        style.ToDoItem__wrapper__data__name
                    )}
                    {Field(
                        inputMain,
                        "Main text field",
                        style.ToDoItem__wrapper__data__main
                    )}
                </div>
                <div
                    style={{
                        backgroundColor: colourMode,
                    }}
                    className={style.ToDoItem__wrapper__buttons}
                >
                    <div
                        style={{
                            backgroundColor: colourMode,
                        }}
                        onClick={() => setIsEditable(!isEditable)}
                    >
                        {isEditable ? (
                            <MdOutlineEditOff
                                style={{
                                    backgroundColor: colourMode,
                                }}
                            />
                        ) : (
                            <MdOutlineModeEditOutline
                                style={{
                                    backgroundColor: colourMode,
                                }}
                            />
                        )}
                    </div>
                    <div
                        onClick={() => dispatch(ItemDeleteAction(numberInList))}
                        style={{
                            backgroundColor: colourMode,
                        }}
                    >
                        <MdDeleteForever
                            style={{
                                backgroundColor: colourMode,
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
