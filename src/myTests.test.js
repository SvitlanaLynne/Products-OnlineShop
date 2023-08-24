import FetchedData from "./components/FetchedData";
import DropDownMenu from "./components/DropDownMenu";
import { render, fireEvent, getByLabelText } from "@testing-library/react";

// Unit test 1

function makefiltersArr() {
  const data = FetchedData();
  return ["all", ...new Set(data.map((product) => product.category))];
}

jest.mock("./components/FetchedData");

test("check if the category array is generated", () => {
  FetchedData.mockReturnValue([
    { title: "product1", category: "1" },
    { title: "product2", category: "2" },
    { title: "product3", category: "3" },
  ]);
  const result = makefiltersArr();
  expect(result).toEqual(["all", "1", "2", "3"]);
});

// Unit test 2

const fetchedProductsArr = [
  { id: "100", title: "product1", category: "1" },
  { id: "101", title: "product2", category: "1" },
  { id: "102", title: "product5", category: "3" },
];

test("check if the fetched data contains Id", () => {
  const product = fetchedProductsArr[0];

  expect(product).toHaveProperty("id", "100");
});

// RTL + jest test

test("select an option of the row", () => {
  const { getByLabelText } = render(<DropDownMenu />);

  const dropdown = getByLabelText("Select the number of rows");

  fireEvent.change(dropdown, { target: { value: "5" } });

  expect(dropdown.value).toBe("5");
});
