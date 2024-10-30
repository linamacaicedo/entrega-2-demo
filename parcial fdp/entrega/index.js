// index.js
const products = data;

function productSelected(pos) {
  let productSelected = products[pos];
  // Redirigimos a la página de detalles del producto, pasando el nombre como parámetro
  window.location = "./detail.html?name=" + productSelected.title;
}

// Función para renderizar productos en la página principal
function renderProducts() {
  let productsContainer = document.getElementById("products-container");
  products.forEach((product, index) => {
    let productElement = `
      <div class="product" onclick="productSelected(${index})">
        <img src="${product.images[0]}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p>$${product.price}</p>
      </div>`;
    productsContainer.innerHTML += productElement;
  });
}

// Ejecutamos la función para renderizar
renderProducts();
