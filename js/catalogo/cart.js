// Contador del carrito
let cartCounter = 0;

function incrementCartCounter() {
  cartCounter++;
  updateCartDisplay();
  saveCartToStorage();
}

function updateCartDisplay() {
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cartCounter;
  }
}

function saveCartToStorage() {
  localStorage.setItem('cartCounter', cartCounter.toString());
}

function loadCartFromStorage() {
  const savedCounter = localStorage.getItem('cartCounter');
  if (savedCounter) {
    cartCounter = parseInt(savedCounter);
    updateCartDisplay();
  }
}

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('add-to-cart')) {
    incrementCartCounter();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  loadCartFromStorage();
});
