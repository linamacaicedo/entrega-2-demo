// detail.js
const params = new URLSearchParams(window.location.search);
const nameFromUrl = params.get("name");

function getProduct() {
  for (let i = 0; i < data.length; i++) {
    let product = data[i];
    if (product.title === nameFromUrl) {
      return new Product(product.id, product.title, product.price, product.description, product.images, product.category.name);
    }
  }
}

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
