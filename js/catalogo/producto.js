document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"));

  const product = productos.find(function (p) {
    return p.id === productId;
  });

  if (product) {
    renderProductDetail(product);
  } else {
    document.querySelector(".product-detail-container").innerHTML =
      "<p>Producto no encontrado.</p>";
  }
});

function renderProductDetail(product) {
  const container = document.querySelector(".product-detail-container");

  let detallesHTML = "";
  for (let i = 0; i < product.detalles.length; i++) {
    const d = product.detalles[i];
    detallesHTML += `<tr><th>${d.label}</th><td>${d.value}</td></tr>`;
  }

  container.innerHTML = `
    <div class="product-detail-image">
      <img src="${product.imagen}" alt="${product.nombre}" />
    </div>
    <div class="product-detail-info">
      <h2 class="product-detail-name">${product.nombre}</h2>
      <p class="product-detail-price">$${product.precio.toLocaleString(
        "es-AR"
      )}</p>
      <p class="product-detail-description">${product.descripcion}</p>
      <table class="product-detail-table">${detallesHTML}</table>
      <button class="add-to-cart">🛒 Añadir al carrito</button>
    </div>
  `;
}
