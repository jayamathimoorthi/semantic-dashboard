let products = [];
let filteredProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productGrid = document.querySelector(".dashboard-grid");

async function loadProducts() {
  showLoading();

  try {
    products = await fetchProducts();
    filteredProducts = [...products];
    renderProducts(filteredProducts);
  } catch (error) {
    showError();
  }
}

function showLoading() {
  productGrid.innerHTML = "";

  for (let i = 0; i < 6; i++) {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h2>Loading...</h2>
      <p>Please wait while products are loading.</p>
    `;
    productGrid.appendChild(card);
  }
}

function showError() {
  productGrid.innerHTML = `
    <article class="card">
      <h2>⚠️ Unable to load products</h2>
      <p>Please check your internet connection and try again.</p>
    </article>
  `;
}

function renderProducts(items) {
  productGrid.innerHTML = "";

  if (items.length === 0) {
    productGrid.innerHTML = `
      <article class="card">
        <h2>No products found</h2>
        <p>Try another search or category.</p>
      </article>
    `;
    return;
  }

  items.forEach((product) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <img 
        src="${product.image}" 
        alt="${product.title}"
        style="width:100%; height:180px; object-fit:contain;"
      >

      <h2>${product.title}</h2>

      <p>Category: ${product.category}</p>

      <p><strong>₹${product.price}</strong></p>

      <button onclick="addToCart(${product.id})">
        Add to Cart
      </button>
    `;

    productGrid.appendChild(card);
  });
}

function addToCart(productId) {
  const product = products.find(
    (item) => item.id === productId
  );

  if (!product) return;

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Product added to cart!");
}

loadProducts();
