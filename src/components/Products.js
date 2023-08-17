import { useEffect, useState } from "react";
import FilterButton from "./FilterButton";
import ProductRow from "./ProductRow";

function Products() {
  const [data, setData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const apiURL = "https://fakestoreapi.com/products";

    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data); // <===========================  temp console.log to see the product details
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleOptionClick = (category) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.includes(category)
        ? prevSelectedOptions.filter((elem) => elem !== category)
        : [...prevSelectedOptions, category]
    );
  };

  const filteredData = data.filter((product) =>
    selectedOptions.includes(product.category)
  );

  const filterOptions = () => {
    const categoriesSet = new Set(data.map((product) => product.category));
    return [...categoriesSet];
  };

  const options = filterOptions();

  return (
    <>
      <div className="filter-options">
        {options.length > 0 &&
          options.map((category) => (
            <FilterButton
              key={category}
              category={category}
              isSelected={selectedOptions.includes(category)}
              onClick={handleOptionClick}
            />
          ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Photo</th>
            <th>Price</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {selectedOptions.length > 0
            ? filteredData.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))
            : data.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
        </tbody>
      </table>
    </>
  );
}

export default Products;
