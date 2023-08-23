import { useParams } from "react-router-dom";
import { useProductsDataContext } from "../components/ProductsDataContext";

function ProductDetails() {
  const data = useProductsDataContext();
  const { productId } = useParams();
  const product = data.find((x) => x.id === parseInt(productId));

  if (!product) {
    return <span>Product not found</span>;
  }

  return (
    <>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
    </>
  );
}

export default ProductDetails;
