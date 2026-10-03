let products = [];
let filteredProducts = [];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productGrid = document.querySelector(".dashboard-grid");
const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-select");
const categoryButtons = document.querySelectorAll(".category-btn");

let selectedCategory = "all";


/* =========================
   Load Products
   ========================= */

async function loadProducts() {

  showLoading();

  try {

    products = await fetchProducts();

    filteredProducts = [...products];

    renderProducts(filteredProducts);

    updateCartCount();

  } catch (error) {

    showError();

  }
}


/* =========================
   Loading State
   ========================= */

function showLoading() {

  productGrid.innerHTML = "";

  for (let i = 0; i < 6; i++) {

    const card = document.createElement("article");

    card.className = "card";

    card.innerHTML = `
      <h2>Loading...</h2>
      <p>Please wait while products are loading...</p>
    `;

    productGrid.appendChild(card);
  }
}


/* =========================
   Error State
   ========================= */

function showError() {

  productGrid.innerHTML = `
    <article class="card">
      <h2>⚠️ Unable to load products</h2>

      <p>
        Please check your internet connection and try again.
      </p>

      <button onclick="loadProducts()">
        Try Again
      </button>
    </article>
  `;
}


/* =========================
   Render Products
   ========================= */

function renderProducts(items) {

  productGrid.innerHTML = "";

  if (items.length === 0) {

    productGrid.innerHTML = `
      <article class="card">

        <h2>No products found</h2>

        <p>
          Try another search or category.
        </p>

      </article>
    `;

    return;
  }


  items.forEach((product) => {

    const card = document.createElement("article");

    card.className = "card";


    card.innerHTML = `
      <img
        src="${product.thumbnail}"
        alt="${product.title}"
        style="
          width:100%;
          height:180px;
          object-fit:contain;
          margin-bottom:15px;
        "
      >

      <h2>${product.title}</h2>

      <p>
        Category: ${product.category}
      </p>

      <p>
        <strong>₹${product.price}</strong>
      </p>

      <button onclick="addToCart(${product.id})">
        Add to Cart
      </button>
    `;


    productGrid.appendChild(card);

  });
}


/* =========================
   Search
   ========================= */

searchInput.addEventListener(
  "input",
  applyFilters
);


/* =========================
   Category
   ========================= */

categoryButtons.forEach((button) => {

  button.addEventListener("click", () => {

    categoryButtons.forEach((btn) => {

      btn.classList.remove("active");

    });


    button.classList.add("active");


    selectedCategory =
      button.dataset.category;


    applyFilters();

  });

});


/* =========================
   Sorting
   ========================= */

sortSelect.addEventListener(
  "change",
  applyFilters
);


/* =========================
   Filter + Sort
   ========================= */

function applyFilters() {

  const searchText =
    searchInput.value
      .toLowerCase()
      .trim();


  filteredProducts =
    products.filter((product) => {

      const matchesSearch =
        product.title
          .toLowerCase()
          .includes(searchText);

const matchesCategory =
  selectedCategory === "all" ||
  product.category
    .toLowerCase()
    .includes(selectedCategory.toLowerCase());
      


      return (
        matchesSearch &&
        matchesCategory
      );

    });


  const sortValue =
    sortSelect.value;


  if (sortValue === "low-high") {

    filteredProducts.sort(
      (a, b) => a.price - b.price
    );

  }


  if (sortValue === "high-low") {

    filteredProducts.sort(
      (a, b) => b.price - a.price
    );

  }


  if (sortValue === "name") {

    filteredProducts.sort(
      (a, b) =>
        a.title.localeCompare(b.title)
    );

  }


  renderProducts(filteredProducts);

}


/* =========================
   Cart
   ========================= */

function addToCart(productId) {

  const product =
    products.find(
      (item) => item.id === productId
    );


  if (!product) return;


  cart.push(product);


  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );


  updateCartCount();


  alert("Product added to cart!");

}


/* =========================
   Cart Count
   ========================= */

function updateCartCount() {

  const cartCount =
    document.querySelector("#cart-count");


  cartCount.textContent =
    cart.length;

}


/* =========================
   Start Application
   ========================= */

loadProducts();
