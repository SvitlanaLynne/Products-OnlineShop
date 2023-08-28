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
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-[3fr,1fr] gap-5 w-11/12">
        <div className="flex justify-center items-center">
          {/* =============== table =============== */}
          <table className="w-full shadow-xl  mb-11">
            <thead className="text-gray-800">
              <tr>
                {/* ===============  sorting  =============== */}
                <SortedColumn
                  column={column}
                  sortConfig={sortConfig}
                  handleSort={handleSort}
                />

                <th className="px-8 py-6 text-lg font-light">Title</th>
                <th className="px-8 py-6 text-lg font-light">Photo</th>
                <th className="px-8 py-6 text-lg font-light">Price</th>
                <th className="px-8 py-6 text-lg font-light">Rating</th>
              </tr>
            </thead>
            <tbody className=" bg-white">
              {filteredAndSortedData.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col justify-start items-center">
          {/*  =============== filters ============== */}
          <div className="flex flex-col h-64 items-start justify-evenly rounded-lg border-4 border-dotted text-sm italic mb-6 border-gray-200">
            <span className="font-semibold text-base text-blue-900 px-6">
              Filters
            </span>
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
          {/* ===============  rows dropdown menu =============== */}
          <DropDownMenu
            rowsNumber={rowsNumber}
            handleOptionChange={handleRowOptionChange}
            rowsNumberArr={rowsNumberArr}
          />
        </div>
      </div>
    </div>
  );
}

export default Products;
