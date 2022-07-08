import React, { useRef } from "react";
import style from "./ToDoItem.module.scss";
import { ItemDeleteAction } from "../../store/ToDoItemsReducer";
import { useDispatch } from "react-redux";
export default function ToDoItem({ inputName, inputMain, numberInList }) {
	const dispatch = useDispatch();

	const nameInputRef = useRef(null);
	const saveBtnRef = useRef(null);

	function editAction() {
		const nameinput = nameInputRef.current;
		if (nameinput.contentEditable === "true") {
			nameinput.contentEditable = "inherit";
			saveBtnRef.current.style.display = "none";
		} else {
			nameinput.contentEditable = "true";
			saveBtnRef.current.style.display = "block";
		}
	}

	return (
		<>
			<div className={style.ToDoItem__wrapper}>
				<div className={style.ToDoItem__wrapper__data}>
					<div ref={nameInputRef} className={style.ToDoItem__wrapper__name}>
						{inputName}
					</div>
					<div className={style.ToDoItem__wrapper__preview}>{inputMain}</div>
				</div>
				<div className={style.ToDoItem__wrapper__buttons}>
					<button 
					ref={saveBtnRef}
					style={{display: "none"}}
					>Save</button>
					<button onClick={editAction}>Edit</button>
					<button onClick={() => dispatch(ItemDeleteAction(numberInList))}>
						Delete
					</button>
				</div>
			</div>
		</>
	);
}
