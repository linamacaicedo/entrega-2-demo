document.addEventListener('DOMContentLoaded', function() {
    // Clases y Objetos
    class Product {
        constructor(name, description, price, image) {
            this.name = name;
            this.description = description;
            this.price = price;
            this.image = image;
        }
    }

    // Generación de datos de ejemplo
    function generateDummyProducts() {
        const products = [];
        for (let i = 1; i <= 15; i++) {
            products.push(new Product(
                `Producto ${i}`,
                `Descripción del producto ${i}`,
                (Math.random() * 100).toFixed(2), // Precio aleatorio
                `https://via.placeholder.com/150?text=Producto+${i}` // Imagen de ejemplo
            ));
        }
        return products;
    }

    const dummyProducts = generateDummyProducts();
    const productContainer = document.getElementById('contenedor-productos');

    // Visualización de los productos
    dummyProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.setAttribute('data-name', product.name);
        productDiv.setAttribute('data-description', product.description);
        
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
            <input type="number" name="quantity" value="1" min="1">
            <button class="add-to-cart-btn">Añadir al carrito</button>
            <button class="view-detail-btn">Ver detalles</button>
        `;

        productContainer.appendChild(productDiv);
    });

    // Manejo del Login
    const loginForm = document.getElementById('loginForm');
    const userBtn = document.getElementById('userBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            localStorage.setItem('userEmail', email);
            window.location.href = 'user-profile.html'; // Redirigir a la página de perfil
        });
    }

    if (userBtn) {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            userBtn.textContent = 'Perfil';
            userBtn.href = 'user-profile.html'; // Redirigir a la página de perfil
        }
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('userEmail');
            window.location.href = 'index.html'; // Redirigir a la página de inicio
        });
    }

    // Carrito de compras
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function addToCart(productName, price) {
        const quantityInput = document.querySelector(`input[name="quantity"]`);
        const quantity = parseInt(quantityInput.value) || 1;
        const product = {
            name: productName,
            price: parseFloat(price),
            quantity: quantity
        };

        const existingProductIndex = cart.findIndex(item => item.name === productName);
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            cart.push(product);
        }

        alert(`${productName} ha sido añadido al carrito.`);
        updateCart();
    }

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Filtrar productos
    window.filterProducts = function() {
        const searchTerm = document.getElementById('search').value.toLowerCase();
        const products = document.querySelectorAll('.product-item');

        products.forEach(product => {
            const productName = product.getAttribute('data-name').toLowerCase();
            product.style.display = productName.includes(searchTerm) ? '' : 'none';
        });
    }

    // Agregar función addToCart a los botones
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productItem = this.closest('.product-item');
            const productName = productItem.getAttribute('data-name');
            const price = productItem.querySelector('.price').textContent.replace('$', '');
            addToCart(productName, price);
        });
    });

    // Manejo de detalles del producto
    const addToDetailButton = document.querySelectorAll('.view-detail-btn');
    addToDetailButton.forEach(button => {
        button.addEventListener('click', function() {
            const productItem = this.closest('.product-item');
            const productName = productItem.getAttribute('data-name');
            const productDescription = productItem.getAttribute('data-description');
            const productPrice = productItem.querySelector('.price').textContent.replace('$', '');
            const productImage = productItem.querySelector('img').src;

            localStorage.setItem('productName', productName);
            localStorage.setItem('productDescription', productDescription);
            localStorage.setItem('productPrice', productPrice);
            localStorage.setItem('productImage', productImage);

            window.location.href = 'product-detail.html'; // Redirigir a la página de detalles del producto
        });
    });

    // Información del producto en la página de detalles
    const productName = localStorage.getItem('productName');
    const productDescription = localStorage.getItem('productDescription');
    const productPrice = localStorage.getItem('productPrice');
    const productImage = localStorage.getItem('productImage');

    if (productName) {
        document.getElementById('productName').textContent = productName;
        document.getElementById('productDescription').textContent = productDescription;
        document.getElementById('productPrice').textContent = `$${productPrice}`;
        document.getElementById('productImage').src = productImage;

        const addToCartBtn = document.getElementById('addToCartBtn');
        addToCartBtn.addEventListener('click', function() {
            const quantity = parseInt(document.getElementById('quantity').value) || 1;
            const product = {
                name: productName,
                price: parseFloat(productPrice),
                quantity: quantity,
                image: productImage
            };

            const existingProductIndex = cart.findIndex(item => item.name === productName);
            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += quantity;
            } else {
                cart.push(product);
            }

            updateCart();
            alert(`${productName} ha sido añadido al carrito.`);
        });
    }
});
