const InitialToDoItemsState = [];
export default function ToDoItemsReducer(
	state = InitialToDoItemsState,
	action
) {
	switch (action.type) {
		case "items/post":
			return [...state, action.payload];
		case "items/delete":
			const result = state.filter(
				(item) => state.indexOf(item) !== action.payload
			);
			return result;
		default:
			return state;
	}
}

export function ItemEditAction(editData) {
	return { type: "items/edit", payload: editData };
}

export function ItemPostAction(item) {
	return { type: "items/post", payload: item };
}

export function ItemDeleteAction(payload) {
	return { type: "items/delete", payload };
}
