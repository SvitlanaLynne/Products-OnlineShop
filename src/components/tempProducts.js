import { useEffect, useState } from "react";
import FilterButton from "./FilterButton";

function Products() {
  const [data, setData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const apiURL = "https://fakestoreapi.com/products";

    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // tracking filters' array change
  useEffect(() => {
    const updatedFilteredData = data.filter((product) =>
      selectedOptions.includes(product.category)
    );
    setFilteredData(updatedFilteredData);
  }, [selectedOptions, data]);

  // array of categories
  const filterOptions = () => {
    const categoriesSet = new Set(data.map((product) => product.category));
    return [...categoriesSet];
  };

  const handleOptionClick = (category) => {
    if (selectedOptions.includes(category)) {
      setSelectedOptions((prevSelectedOptions) =>
        prevSelectedOptions.filter((elem) => elem !== category)
      );
    } else {
      setSelectedOptions((prevSelectedOptions) => [
        ...prevSelectedOptions,
        category,
      ]);
    }
  };

  return (
    <>
      <div className="filter-options">
        {filterOptions().length > 0 &&
          filterOptions().map((category) => (
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
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>
                    <img
                      src={product.image}
                      alt="Product"
                      width="100"
                      height="100"
                    />
                  </td>
                  <td>Image</td>
                  <td>{product.price}</td>
                  <td>{product.rating.rate}</td>
                </tr>
              ))
            : data.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>
                    <img
                      src={product.image}
                      alt="Product"
                      width="100"
                      height="100"
                    />
                  </td>
                  <td>Image</td>
                  <td>{product.price}</td>
                  <td>{product.rating.rate}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </>
  );
}

export default Products;
