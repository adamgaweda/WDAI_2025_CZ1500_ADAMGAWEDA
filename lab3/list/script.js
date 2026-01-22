let itemTable = document.getElementById("table");
let filterButton = document.getElementById("filterButton");
let originalProducts = [];

fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
        originalProducts = data.products.slice(0, 30);
        renderTable(originalProducts);
    });

function renderTable(products) {
    const body = document.getElementsByTagName("tbody")[0];
    body.innerHTML = "";
    products.forEach((element) => {
        const row = body.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = '<img src="' + element.thumbnail + '" alt="Zdjęcie produktu">';
        cell2.innerHTML = element.title;
        cell3.innerHTML = element.description;
    });
}

filterButton.addEventListener("click", () => {
    const filterInput = document.getElementById("filter").value.toLowerCase();
    const direction = document.getElementById("sort").value;
    const filteredProducts = originalProducts.filter(
        (product) =>
            product.title.toLowerCase().includes(filterInput) || product.description.toLowerCase().includes(filterInput)
    );
    switch (direction) {
        case "original":
            break;
        case "asc":
            filteredProducts.sort((row1, row2) => row1.title.localeCompare(row2.title));
            break;
        case "desc":
            filteredProducts.sort((row1, row2) => row2.title.localeCompare(row1.title));
            break;
    }
    renderTable(filteredProducts);
});