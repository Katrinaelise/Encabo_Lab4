// Controlled component: every value comes from props (state in App.jsx),
// and every change calls a setter that updates that state.
const CATEGORIES = ["All", "Electronics", "Books", "School Supplies", "Accessories"];

function SearchBar({
  searchText,
  onSearchChange,
  category,
  onCategoryChange,
  sortOrder,
  onSortChange,
  onClear,
}) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search products"
      />

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        aria-label="Filter by category"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Sort by price"
      >
        <option value="default">Default</option>
        <option value="low-high">Price: Low to High</option>
        <option value="high-low">Price: High to Low</option>
      </select>

      <button type="button" onClick={onClear}>
        Clear Filters
      </button>
    </div>
  );
}

export default SearchBar;
