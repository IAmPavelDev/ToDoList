import React from "react";
import style from "./ToDoItemCreate.module.scss";
import { ItemPostAction } from "../../store/ToDoItemsReducer";
import { useDispatch, useSelector } from "react-redux";
import itemsSync from "../../server/sync";

export default function ToDoItemCreate() {
	const dispatch = useDispatch();
	const items = useSelector(state => state);

    const sync = new itemsSync();

	let buffer = {
		name: "",
		main: "",
	};
	function inputAction(event) {
		buffer[event.currentTarget.id] = event.currentTarget.value;
	}
	function addToStore() {
		dispatch(ItemPostAction({...buffer}));
		buffer.main = "";
		buffer.name = "";
		document.getElementById("name").value = "";
		document.getElementById("main").value = "";
	}
	function syncWithDb() {
        sync.postItems(items);
	}
	return (
		<>
			<div className={style.create__wrapper}>
				<input
					id="name"
					type="text"
					className={style.create__wrapper__name}
					onInput={(e) => inputAction(e)}
				/>
				<input
					id="main"
					type="text"
					className={style.create__wrapper__main}
					onInput={(e) => inputAction(e)}
				/>
				<button
					id="add__btn"
					className="create__wrapper__addBtn"
					onClick={addToStore}
				>
					Add
				</button>
				<button 
					id="sync__btn"
					onClick={syncWithDb}
				>
					Sync
				</button>
			</div>
		</>
	);
}
