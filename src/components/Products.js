import { useEffect, useState } from "react";
import FilterButton from "./FilterButton";
import ProductRow from "./ProductRow";
import DropDownMenu from "./DropDownMenu";
import SortedColumn from "./SortedColumn";
import { useProductsDataContext } from "../components/ProductsDataContext";

function Products() {
  const data = useProductsDataContext();
  const rowsNumberArr = [3, 5, 10];
  const [filtersArr, setFiltersArr] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [rowsNumber, setRowsNumber] = useState(
    rowsNumberArr[rowsNumberArr.length - 1]
  );

  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);

  let column = "Id";

  const [sortConfig, setSortConfig] = useState({ column: "Id", order: "asc" });

  // ===============  Filter > Sort > Slice  ===============
  useEffect(() => {
    setFiltersArr(["all", ...new Set(data.map((product) => product.category))]);

    const resetSelectedFiltersArr = () => {
      setSelectedFilters([]);
    };

    const filteredData = data.filter((product) => {
      if (selectedFilters.length === 0) {
        return true;
      } else if (selectedFilters.includes("all")) {
        resetSelectedFiltersArr();
        return true;
      } else {
        return selectedFilters.includes(product.category);
      }
    });

    const sortedData = [...filteredData].sort((a, b) => {
      const sortOrder = sortConfig.order === "asc" ? 1 : -1;
      return sortOrder * (a.id - b.id);
    });

    const slicedData = sortedData.slice(0, rowsNumber);
    setFilteredAndSortedData(slicedData);
  }, [selectedFilters, rowsNumber, sortConfig, data, filtersArr.length]);

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

  // ===============  ROWS  ===============
  const handleRowOptionChange = (event) => {
    const selectedValue = parseInt(event.target.value);

    setRowsNumber(selectedValue);
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
          {filteredAndSortedData.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Products;
