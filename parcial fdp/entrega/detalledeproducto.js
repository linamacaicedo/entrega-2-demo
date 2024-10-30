document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const userBtn = document.getElementById('userBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    // Manejo del Login
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            localStorage.setItem('userEmail', email);
            window.location.href = 'user-profile.html';
        });
    }

    // Manejo de mostrar el nombre del usuario logueado en el botón
    if (userBtn) {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            userBtn.textContent = 'Perfil';
            userBtn.href = 'user-profile.html';
        }
    }

    // Manejo del Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('userEmail');
            window.location.href = 'index.html';
        });
    }

    // Carrito de compras
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Función para agregar productos al carrito
    function addToCart(productName, price) {
        const quantityInput = document.querySelector(`input[name="quantity"]`);
        const quantity = parseInt(quantityInput.value);
        const product = {
            name: productName,
            price: parseFloat(price),
            quantity: quantity
        };

        // Comprobar si el producto ya está en el carrito
        const existingProductIndex = cart.findIndex(item => item.name === productName);
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += quantity; // Aumentar cantidad
        } else {
            cart.push(product); // Agregar nuevo producto
        }

        alert(`${productName} ha sido añadido al carrito.`);
        updateCart();
    }

    // Función para actualizar el carrito en localStorage
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Función para filtrar productos
    window.filterProducts = function() {
        const searchTerm = document.getElementById('search').value.toLowerCase();
        const products = document.querySelectorAll('.product-item');

        products.forEach(product => {
            const productName = product.getAttribute('data-name').toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = ''; // Mostrar producto
            } else {
                product.style.display = 'none'; // Ocultar producto
            }
        });
    }

    // Para agregar la función addToCart al botón de cada producto
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productItem = this.closest('.product-item');
            const productName = productItem.getAttribute('data-name');
            const price = productItem.querySelector('.price').textContent.replace('$', '');
            addToCart(productName, price);
        });
    });
});
