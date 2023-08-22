import { useEffect, useState } from "react";
import FilterButton from "./FilterButton";
import ProductRow from "./ProductRow";
import DropDownMenu from "./DropDownMenu";
import SortedColumn from "./SortedColumn";

function Products() {
  const rowsNumberArr = [3, 5, 10];

  const [data, setData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [rowsNumber, setRowsNumber] = useState(
    rowsNumberArr[rowsNumberArr.length - 1]
  );
  const [filtersArr, setFiltersArr] = useState([]);
  const [configuredData, setConfiguredData] = useState([]);

  const [sortedData, setSortedData] = useState([]);

  const column = "Id";
  const [sortConfig, setSortConfig] = useState({ column: "Id", order: "asc" });

  useEffect(() => {
    const apiURL = "https://fakestoreapi.com/products";

    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        setData(data);

        /*  =============== filters ============== */
        setFiltersArr([
          "all",
          ...new Set(data.map((product) => product.category)),
        ]); // array of filters to use

        /*  =============== rows ============== */
        let slicedData = data.slice(0, rowsNumber);
        setData(slicedData);

        const resetSelectedFiltersArr = () => {
          setSelectedFilters([]);
        };
        let filteredSlicedData = data
          .filter((product) =>
            selectedFilters.includes("all")
              ? resetSelectedFiltersArr()
              : selectedFilters.includes(product.category)
          )
          .slice(0, rowsNumber);
        setConfiguredData(filteredSlicedData); //  filtered, then sliced

        /*  =============== sorting ============== */

        const sortOrder = sortConfig.order === "asc" ? 1 : -1;

        let sortedAllData = [...data];
        let filteredSlicedSortedData = [...filteredSlicedData];

        if (sortConfig.column === "Id") {
          sortedAllData.sort((a, b) => {
            return sortOrder * (a.id - b.id);
          });
          filteredSlicedSortedData.sort((a, b) => {
            return sortOrder * (a.id - b.id);
          });
        }
        setSortedData(sortedAllData);
        setConfiguredData(filteredSlicedSortedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedFilters, rowsNumber, sortConfig]);

  // ===============  ROWS  ===============
  const handleRowOptionChange = (event) => {
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
  // ===============  SORTING  ===============
  const handleSort = (newSortConfig) => {
    setSortConfig(newSortConfig);
  };

  return (
    <>
      {/* ===============  rows dropdown menu =============== */}
      <DropDownMenu
        rowsNumber={rowsNumber}
        handleOptionChange={handleRowOptionChange}
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
            {/* ===============  sorting  =============== */}
            <SortedColumn
              column={column}
              sortConfig={sortConfig}
              handleSort={handleSort}
            />

            <th>Title</th>
            <th>Photo</th>
            <th>Price</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {selectedFilters.length > 0
            ? configuredData.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))
            : sortedData.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
        </tbody>
      </table>
    </>
  );
}

export default Products;
