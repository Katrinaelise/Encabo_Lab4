import { useState, useEffect } from "react";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  // --- State ---
  const [searchText, setSearchText] = useState("");          // what the user is typing
  const [debouncedSearch, setDebouncedSearch] = useState(""); // value used for filtering
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [cartMessage, setCartMessage] = useState("");         // Lab 3 cart feature

  // --- Effect 1: debounce (300 ms) ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer); // cleanup: cancel the previous timer
  }, [searchText]);

  // --- Derived data (calculated during render, not stored in state) ---
  let filteredProducts = [...products]; // copy so the original is never mutated

  const keyword = debouncedSearch.trim().toLowerCase();
  if (keyword) {
    filteredProducts = filteredProducts.filter((p) =>
      p.title.toLowerCase().includes(keyword)
    );
  }

  if (category !== "All") {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  if (sortOrder === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // --- Effect 2: update the browser tab title ---
  useEffect(() => {
    document.title = `CvSU Mini Store (${filteredProducts.length} results)`;
  }, [filteredProducts.length]);

  // --- Handlers ---
  const handleClear = () => {
    setSearchText("");
    setDebouncedSearch(""); // so the list resets immediately, without waiting 300 ms
    setCategory("All");
    setSortOrder("default");
  };

  const handleAddToCart = (product) => {
    setCartMessage(`${product.title} added to cart!`);
  };

  return (
    <div className="app">
      <h1>CvSU Mini Store</h1>

      {cartMessage && <p className="cart-message">{cartMessage}</p>}

      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onClear={handleClear}
      />

      <p className="result-count">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {filteredProducts.length === 0 ? (
        <p className="empty-state">
          No products found. Try a different keyword or category.
        </p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
