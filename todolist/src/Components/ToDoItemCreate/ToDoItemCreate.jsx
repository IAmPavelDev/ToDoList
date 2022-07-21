import React, { useState, useEffect, useRef } from "react";
import style from "./ToDoItemCreate.module.scss";
import { ItemPostAction } from "../../store/ToDoItemsReducer";
import { useDispatch, useSelector } from "react-redux";
import itemsSync from "../../server/sync";
import { FiPaperclip, FiMoon } from "react-icons/fi";
import { MdAddBox, MdBackHand, MdSync, MdWbSunny } from "react-icons/md";

export default function ToDoItemCreate({ colourMode, setColourMode }) {
    const dispatch = useDispatch();
    const items = useSelector((state) => state);
    const sync = new itemsSync();
    const themeStatic = {
        color: colourMode === "white" ? "black" : "white",
        backgroundColor: colourMode,
    };
    const [colour, setColour] = useState(themeStatic);
    useEffect(() => {
        console.log(colourMode);
        setColour(themeStatic);
        // console.log(colour);
    }, [colourMode]);
    let buffer = {
        name: "",
        main: "",
    };
    function inputAction(event) {
        buffer[event.currentTarget.id] = event.currentTarget.innerText;
        event.currentTarget.style.opacity = "1";
    }
    function addToStore() {
        dispatch(ItemPostAction({ ...buffer }));
        buffer.main = "";
        buffer.name = "";
        document.getElementById("name").innerText = "";
        document.getElementById("main").innerText = "";
    }
    function syncWithDb() {
        sync.postItems(items);
    }
    function Field(placeholder, styleClass, id) {
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
                id={id}
                ref={fieldRef}
                className={styleClass}
                contentEditable={true}
                suppressContentEditableWarning={true}
                onSelect={() => {
                    if (fieldRef.current.innerText === placeholder) {
                        fieldRef.current.innerText = " ";
                        fieldRef.current.style.color = colour;
                    }
                }}
                onBlur={setDefaultField}
                onInput={(e) => inputAction(e)}
                style={{ ...colour, borderColor: themeStatic.color }}
            />
        );
    }
    return (
        <>
            <div style={colour} className={style.create__wrapper}>
                <div style={colour} className={style.create__wrapper__inputs}>
                    {Field("name", style.create__wrapper__name, "name")}
                    {Field(
                        "Main text field",
                        style.create__wrapper__name,
                        "main"
                    )}
                </div>
                <div style={colour} className={style.create__wrapper__buttons}>
                    <MdAddBox
                        id="add__btn"
                        onClick={addToStore}
                        style={colour}
                        className={style.create__wrapper__buttons__btn}
                    />
                    <MdSync
                        id="sync__btn"
                        onClick={syncWithDb}
                        style={colour}
                        className={style.create__wrapper__buttons__btn}
                    />
                    <FiPaperclip
                        id="additions__btn"
                        style={colour}
                        className={style.create__wrapper__buttons__btn}
                    />
                    <div
                        className={style.create__wrapper__buttons__btn}
                        style={colour}
                        onClick={() => {
                            setColourMode();
                        }}
                    >
                        {colourMode === "white" ? (
                            <MdWbSunny style={colour} />
                        ) : (
                            <FiMoon style={colour} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
