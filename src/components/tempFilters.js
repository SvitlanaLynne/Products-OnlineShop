import React, { useState } from "react";
import FilterButton from "./FilterButton";

function Filters() {
  const products = [
    // ========== temporary products to test the filter
    { id: 1, name: "Product A", category: "Option 1" },
    { id: 2, name: "Product B", category: "Option 2" },
    { id: 3, name: "Product C", category: "Option 3" },
    { id: 4, name: "Product D", category: "Option 1" },
    // Add more products with categories
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products); // <====== products are not defined, should be the fetched data

  const filterOptions = [
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" },
    // Add more options as needed
  ];

  const handleOptionClick = (optionId) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
    }

    // Filter products based on selected options
    const selectedOptionLabels = selectedOptions.map(
      (id) => filterOptions.find((option) => option.id === id).label
    );
    console.log(selectedOptionLabels);

    if (selectedOptionLabels.length === 0) {
      setFilteredProducts(products);
    } else {
      const newFilteredProducts = products.filter((product) =>
        selectedOptionLabels.includes(product.category)
      );
      setFilteredProducts(newFilteredProducts);
    }
  };

  return (
    <div className="filter-container">
      <h2>Filters:</h2>
      <div className="filter-options">
        {filterOptions.map((option) => (
          <FilterButton
            key={option.id}
            option={option}
            isSelected={selectedOptions.includes(option.id)}
            onClick={handleOptionClick}
          />
        ))}
      </div>
      <p>
        Selected options:{" "}
        {selectedOptions
          .map((id) => filterOptions.find((option) => option.id === id).label)
          .join(", ")}
      </p>
      {/* // ============ ========  temporary to test the filter ========== ============*/}
      <h3>Filtered Products:</h3>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.name} - {product.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Filters;
