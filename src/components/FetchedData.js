import { useProductsDataContext } from "./ProductsDataContext";

function FetchedData() {
  const data = useProductsDataContext();
  return data;
}

export default FetchedData;
