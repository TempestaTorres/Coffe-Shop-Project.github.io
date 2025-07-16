function getFromLocalStorage(itemName) {

    let arr = [];

    let items = localStorage.getItem(itemName);

    if (items) {
        arr = JSON.parse(items);
    }

    return arr;
}
function addToLocalStorage(itemName, items) {

    localStorage.setItem(itemName, JSON.stringify(items));
}