import { createContext, useContext, useState, useEffect } from "react";

const ProductsDataContext = createContext();

export const ProductsDataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiURL = "https://fakestoreapi.com/products";

    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <ProductsDataContext.Provider value={data}>
      {children}
    </ProductsDataContext.Provider>
  );
};

export const useProductsDataContext = () => {
  return useContext(ProductsDataContext);
};
