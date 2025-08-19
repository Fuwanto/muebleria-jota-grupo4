document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid")
  const searchInput = document.getElementById("search-input")
  const searchForm = document.querySelector(".search-container")

  // Simular carga asíncrona de productos
  async function loadProducts() {
    try {
      // Simulamos un retraso de red
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Renderizar todos los productos inicialmente
      renderProducts(productos)
    } catch (error) {
      console.error("Error cargando productos:", error)
      productGrid.innerHTML = `<p class="error">Error al cargar los productos. Intente nuevamente.</p>`
    }
  }

  // Función para renderizar productos
  function renderProducts(products) {
    productGrid.innerHTML = ""

    if (products.length === 0) {
      productGrid.innerHTML = `<p class="no-results">No se encontraron productos</p>`
      return
    }

    products.forEach((product) => {
      const productCard = document.createElement("div")
      productCard.className = "product-card"
      productCard.innerHTML = `<article class="product-card">
  <figure class="product-image-container">
    <img src="${product.imagen}" alt="${product.nombre}" />
  </figure>
  <div class="product-info">
    <h2 class="product-name">${product.nombre}</h2>
    <p class="product-description">${product.descripcion}</p>

    <p class="product-price">$${product.precio.toLocaleString("es-AR")}</p>

    <a href="producto.html?id=${product.id}" class="detalle-button">
      Ver Detalle
    </a>
  </div>
</article>

  `
      productGrid.appendChild(productCard)
    })
  }

  // filtro de busqueda
  function searchProducts() {
    const searchTerm = searchInput.value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
    if (searchTerm === "") {
      renderProducts(productos)
      return
    }

    const filteredProducts = productos.filter((product) => {
      const nombreNormalizado = product.nombre
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
      return nombreNormalizado.includes(searchTerm)
    })

    renderProducts(filteredProducts)
  }

  // Event listeners
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    searchProducts()
  })

  // Inicializar
  loadProducts()
})
