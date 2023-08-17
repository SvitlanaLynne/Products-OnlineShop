import { useEffect, useState } from "react";
import FilterButton from "./FilterButton";
import ProductRow from "./ProductRow";
import DropDownMenu from "./DropDownMenu";

function Products() {
  const rowsNumberArr = [3, 5, 10];

  const [data, setData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [rowsNumber, setRowsNumber] = useState(
    rowsNumberArr[rowsNumberArr.length - 1]
  );
  const [filtersArr, setFiltersArr] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const apiURL = "https://fakestoreapi.com/products";

    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        setData(data); // all data on the screen

        setFiltersArr([...new Set(data.map((product) => product.category))]); // array of filters to use

        let slicedData = data.slice(0, rowsNumber);
        setData(slicedData); // portion of data on the screen - by number of raws

        let filteredSlicedData = data // first filter, then slice
          .filter((product) => selectedFilters.includes(product.category))
          .slice(0, rowsNumber);
        setFilteredData(filteredSlicedData); // portion of data on the screen
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedFilters, rowsNumber]);

  // ===============  ROWS  ===============
  const handleOptionChange = (event) => {
    const selectedValue = parseInt(event.target.value);

    setRowsNumber(selectedValue);
  };

  // ===============  FILTERS  ===============
  const handleOptionClick = (category) => {
    setSelectedFilters((prevSelectedOptions) =>
      prevSelectedOptions.includes(category)
        ? prevSelectedOptions.filter((elem) => elem !== category)
        : [...prevSelectedOptions, category]
    );
  };

  return (
    <>
      {/* ===============  rows dropdown menu =============== */}
      <DropDownMenu
        rowsNumber={rowsNumber}
        handleOptionChange={handleOptionChange}
        rowsNumberArr={rowsNumberArr}
      />
      {/*  =============== filters ============== */}
      <div className="filter-options">
        {filtersArr.length > 0 &&
          filtersArr.map((category) => (
            <FilterButton
              key={category}
              category={category}
              isSelected={selectedFilters.includes(category)}
              onClick={handleOptionClick}
            />
          ))}
      </div>
      {/* =============== table =============== */}
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
          {selectedFilters.length > 0
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
