// Obtenemos el nombre del producto desde la URL
const params = new URLSearchParams(window.location.search);
const nameFromUrl = params.get("name");

// Función que busca el producto en la lista de datos
function getProduct() {
    for (let i = 0; i < data.length; i++) {
        let map = data[i];
        let title = map["title"];
        if (title === nameFromUrl) {
            let product = new Product(map["id"], map["title"], map["price"], map["description"], map["images"], map["category"]["name"]);
            return product;
        }
    }
}

// Función que renderiza los detalles del producto en la página
function renderProduct() {
    let product = getProduct();

    let titleH1 = document.getElementById("title");
    titleH1.innerHTML = product.title;

    let descriptionP = document.getElementById("description");
    descriptionP.innerHTML = product.description;

    let priceH3 = document.getElementById("price");
    priceH3.innerHTML = "$ " + product.price;

    let mainImg = document.getElementById("main-img");
    mainImg.src = product.images[0];
}

// Ejecutamos la función que renderiza el producto
renderProduct();
