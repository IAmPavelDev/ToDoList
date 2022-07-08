import findItemsToSend from "./findItemsToSend";

export default class itemsSync {
    async getItems() {
        const token = localStorage.getItem("token");
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        return await fetch("http://localhost:5000/api/item", requestOptions)
            .then((response) => response.json())
            .catch((error) => console.log("error", error));
    }
    async postItems(store) {
        const server = await this.getItems();

        ["POST", "DELETE"].map(async (action) => {
            const diffItemsToPost = await findItemsToSend(
                store,
                server.rows,
                action
            );

            const token = localStorage.getItem("token");
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");
            for (let input of diffItemsToPost) {
                input = JSON.stringify(input);
                const requestOptions = {
                    method: "post",
                    headers: myHeaders,
                    body: input,
                    redirect: "follow",
                };
                const URL =
                    action === "POST"
                        ? "http://localhost:5000/api/item"
                        : "http://localhost:5000/api/item/delete";
                await fetch(URL, requestOptions)
                    .then((response) => response.json())
                    .catch((error) => console.log("error", error));
            }
        });
    }
}
