(function(){
    const grid = document.getElementById("destacados-grid");
    if (!grid) return;

    try {
        const destacados = (productos || [])
        .filter(p => p.destacado === true)
        .slice(0,5); 
    if (destacados.length === 0) {
        grid.innerHTML = `<p> No hay productos destacados por el momento.</p>` ;
        return;
    }

    const html = destacados.map(p => `
        <article class= "product-card">
            <div class="product-image-container">
                <img src="${p.imagen}" alt="${p.nombre}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${p.nombre}</h3>
            </div>
            <a href="producto.html?id=${p.id}" class="detalle-button">Ver Detalle</a>
        </article>
    `).join("");

    grid.innerHTML = html;
    } catch (e) {
        console.error(e);
        grid.innerHTML = `<p> Ups, no pudimos cargar los destacados.</p>` ;
    }
}) ();
