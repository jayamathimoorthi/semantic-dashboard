# Dynamic Product Dashboard

A responsive product dashboard using JavaScript ES6+, REST API, search, category filtering, sorting, and localStorage.

## Implementation Note

Implemented a dynamic product dashboard using JavaScript ES6+ and a public REST API.

The application uses async/await and fetch() to retrieve live product data from the DummyJSON REST API.

Users can:
- Search products in real time
- Filter products by category
- Sort products by price and name
- Add products to cart
- Store cart data using localStorage
- View loading states while data is being fetched
- See a user-friendly error message when the API request fails

The JavaScript code is organized into separate modular files:

- `app.js` - Handles UI, search, filtering, sorting, cart, and application state
- `api.js` - Handles REST API requests and product data fetching

## Technologies Used

- HTML5
- CSS3
- JavaScript ES6+
- Fetch API
- Async/Await
- REST API
- LocalStorage
- DummyJSON API
- Responsive CSS

## Features

### Live REST API
Products are fetched dynamically from the DummyJSON REST API.

### Real-Time Search
Users can search products without reloading the page.

### Category Filtering
Products can be filtered using category buttons such as Smartphones, Laptops, Beauty, and Furniture.

### Sorting
Products can be sorted by:
- Price: Low to High
- Price: High to Low
- Name: A to Z

### LocalStorage
Cart information is stored in the browser using localStorage.

### Error Handling
The application displays a friendly error message and Try Again option when the API request fails.

### Responsive Design
The dashboard works across mobile, tablet, and desktop screen sizes.
