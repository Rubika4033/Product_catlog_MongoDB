// ================== CART PAGE SCRIPT ==================

// Get cart data from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart data
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Remove an item from cart
function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1); // remove by index
  saveCart(cart);
  renderCart();
}

// Update the total and display items
function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const cart = getCart();

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p style="text-align:center;margin-top:1rem;">Your cart is empty 🛒</p>`;
    totalEl.textContent = "0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
      </div>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  totalEl.textContent = total.toFixed(2);
}

// Update cart count in navbar
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = getCart().length;
}

// Initialize cart display
renderCart();
updateCartCount();
