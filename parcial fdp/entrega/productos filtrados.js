function filterProducts() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const products = document.querySelectorAll('.product');
    let visibleCount = 0;
  
    products.forEach(product => {
      const productName = product.getAttribute('data-name').toLowerCase();
  
      if (productName.includes(searchInput)) {
        product.classList.add('show'); // Muestra el producto si coincide con la búsqueda
        visibleCount++;
      } else {
        product.classList.remove('show'); // Oculta el producto si no coincide
      }
    });
  
    const noResultsMessage = document.getElementById('no-results');
    
    if (visibleCount === 0) {
      noResultsMessage.style.display = 'block'; // Muestra el mensaje si no hay resultados
    } else {
      noResultsMessage.style.display = 'none'; // Oculta el mensaje si hay productos visibles
    }
  }
  