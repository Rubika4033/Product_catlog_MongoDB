// ================== PRODUCTS ==================
const products = [
  { id: 1, name: "Travel Bag", price: 59, category: "bags" ,image: "images/travel bag.jpg" },
  { id: 2, name: "Classic Backpack", price: 45, category: "bags" ,image: "images/classic_bag.jpg" },
  { id: 3, name: "Casual Sneakers", price: 69, category: "shoes" ,image: "images/shoe.png" },
  { id: 4, name: "Formal Shoes", price: 89, category: "shoes", image: "images/formalshoe.webp" },
  { id: 5, name: "Wireless Earbuds", price: 99, category: "electronics" ,image: "images/earbud.png" },
  { id: 6, name: "Smart Watch", price: 149, category: "watch" ,image: "images/smart watch.jpeg" },
  { id: 7, name: 'Golden Watch', price: 120, category: 'watch' ,image: "images/watch.jpg"},
  { id: 8, name: 'Printed Dress', price: 60 ,category: 'dress', image: "images/dress.webp"},
  { id: 9, name: 'Leather Bag', price: 80 ,category: 'bags' ,image: "images/leatherbag.jpg"},
  { id: 10,name: 'Earings', price: 40 ,category: 'jewellery', image: "images/earning.jpg"},
  { id:11, name: 'Laptop', price: 900 ,category: 'electronics', image: "images/laptop.jpeg"},
  { id:12, name: 'Face Cream', price: 25 ,category: 'beauty_product'  ,image: "images/facecreame.webp"},
  { id:13, name: 'Running Shoes', price: 100 ,category: 'shoes', image: "images/running_shoe.jpg"},
  { id:14, name: 'Notebook Set', price: 15 ,category: 'stationery', image: "images/station.jpg"},
  { id:15, name: 'Organic Banana', price: 3 ,category: 'grocery', image: "images/banana.jpg"},
  { id:16, name: 'Bangle', price: 400 ,category: 'jewellery', image: "images/bangle.jpeg"},
  { id:17, name: 'Chuddi', price: 200 ,category: 'dress', image: "images/chudi.webp"},
  { id:18, name: 'Saree', price: 500 ,category: 'dress', image: "images/saree.webp"},
  { id:17, name: 'Jeans', price: 700 ,category: 'dress', image: "images/jean.webp"},
  { id:18, name: 'Sudarmani', price: 200 ,category: 'dress', image: "images/inner.webp"},
  { id:19, name: 'Strap Watch', price: 600 ,category: 'watch', image: "images/strapwatch.webp"},
  { id:20, name: 'LED TV', price: 1500 ,category: 'electronics', image: "images/tv.png"},
  { id:21, name: 'Gold Chain', price: 15000 ,category: 'jewellery', image: "images/chain.jpg"},
];

// ================== DISPLAY PRODUCTS ==================
const productContainer = document.getElementById("product-container");
if (productContainer) displayProducts(products);

function displayProducts(items) {
  productContainer.innerHTML = "";
  if (!items || items.length === 0) {
    productContainer.innerHTML = `<p class="no-results">No matching products found.</p>`;
    return;
  }
  items.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productContainer.appendChild(div);
  });
}

// ================== SEARCH FUNCTIONALITY ==================
const searchInput = document.getElementById("search-input");
if (searchInput && productContainer) {
  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.trim().toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
    displayProducts(filtered);
  });
}

// ================== CART FUNCTIONALITY ==================
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const cart = getCart();
  cart.push(product);
  saveCart(cart);
  alert(`${product.name} added to cart!`);
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = getCart().length;
}

updateCartCount();

// ================== CATEGORY FILTER ==================
const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get("category");
if (selectedCategory && productContainer) {
  const filtered = products.filter((p) =>
    p.category.toLowerCase().includes(selectedCategory.toLowerCase())
  );
  displayProducts(filtered);
}

// ✅ Working Search Functionality (keeps everything else unchanged)
const activeSearch = document.getElementById("searchInput");
if (activeSearch && productContainer) {
  activeSearch.addEventListener("input", (e) => {
    const term = e.target.value.trim().toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
    displayProducts(filtered);
  });
}

