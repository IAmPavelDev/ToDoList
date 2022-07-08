export default function findItemsToSend(store, server, type) {
    const res = [];
    if (type === "POST") {
        for (const storeItem of store) {
            let check = true;
            for (const servItem of server) {
                if (
                    storeItem.name === servItem.name &&
                    storeItem.main === servItem.main
                ) {
                    check = false;
                    break;
                }
            }
            if (check) res.push(storeItem);
        }
    } else if(type === "DELETE") {
        for (const servItem of server) {
            let check = true;
            for (const storeItem of store) {
                if (
                    storeItem.name === servItem.name &&
                    storeItem.main === servItem.main
                ) {
                    check = false;
                    break;
                }
            }
            if (check) res.push(servItem);
        }
    }

    return res;
}

// export default function findItemsToDelete(store, server) {
//     const res = [];
//     for (const servItem of server) {
//         let check = true;
//         for (const storeItem of store) {
//             if (
//                 storeItem.input__name === servItem.name &&
//                 storeItem.input__main === servItem.main
//             ) {
//                 check = false;
//                 break;
//             }
//         }
//         if (check) res.push(storeItem);
//     }
//     return res;
// }
