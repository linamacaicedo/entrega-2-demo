document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("cat") || "home";

    const categoryTitle = document.getElementById("categoryTitle");
    const productGrid = document.getElementById("productGrid");

    const categories = {
        home: "Home",
        skincare: "Skincare",
        makeup: "Makeup",
        fragrance: "Fragrance",
        haircare: "Haircare"
    };

    categoryTitle.textContent = categories[category] || "Category";

    // Ejemplo de productos para cada categoría
    const products = {
        skincare: [
            { name: "Skincare Product 1", price: "$25.99", img: "skincare1.jpg" },
            { name: "Skincare Product 2", price: "$19.99", img: "skincare2.jpg" },
        ],
        makeup: [
            { name: "Makeup Product 1", price: "$15.99", img: "makeup1.jpg" },
            { name: "Makeup Product 2", price: "$29.99", img: "makeup2.jpg" },
        ],
        fragrance: [
            { name: "Fragrance Product 1", price: "$45.99", img: "fragrance1.jpg" },
            { name: "Fragrance Product 2", price: "$39.99", img: "fragrance2.jpg" },
        ],
        haircare: [
            { name: "Haircare Product 1", price: "$20.99", img: "haircare1.jpg" },
            { name: "Haircare Product 2", price: "$18.99", img: "haircare2.jpg" },
        ]
    };

    if (products[category]) {
        products[category].forEach(product => {
            const productItem = document.createElement("div");
            productItem.classList.add("product-item");
            productItem.innerHTML = `
                <img src="./img/${product.img}" alt="${product.name}">
                <p>${product.name}</p>
                <p>${product.price}</p>
            `;
            productGrid.appendChild(productItem);
        });
    }
});
