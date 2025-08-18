document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid")
  const searchInput = document.getElementById("search-input")
  const searchButton = document.getElementById("search-button")

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
    <ul class="product-details">
      <li><strong>Medidas:</strong> ${product.medidas}</li>
      <li><strong>Materiales:</strong> ${product.materiales}</li>
      ${
        product.acabado
          ? `<li><strong>Acabado:</strong> ${product.acabado}</li>`
          : ""
      }
      ${product.peso ? `<li><strong>Peso:</strong> ${product.peso}</li>` : ""}
      ${
        product.capacidad
          ? `<li><strong>Capacidad:</strong> ${product.capacidad}</li>`
          : ""
      }
    </ul>
    <a href="producto.html?id=${
      product.id
    }" class="detalle-button">Ver Detalle</a>
  </div>
</article>
  `
      productGrid.appendChild(productCard)
    })
  }

  // filtro de busqueda
  function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim()
    if (searchTerm === "") {
      renderProducts(productos)
      return
    }

    const filteredProducts = productos.filter((product) =>
      product.nombre.toLowerCase().includes(searchTerm)
    )

    renderProducts(filteredProducts)
  }

  // Event listeners
  searchButton.addEventListener("click", searchProducts)
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") searchProducts()
  })

  // Inicializar
  loadProducts()
})
