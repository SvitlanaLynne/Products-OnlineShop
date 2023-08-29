import { Link, useParams } from "react-router-dom";
import { useProductsDataContext } from "../components/ProductsDataContext";

function ProductDetails() {
  const data = useProductsDataContext();
  const { productId } = useParams();
  const product = data.find((x) => x.id === parseInt(productId));

  if (!product) {
    return <span>Product not found</span>;
  }

  return (
    <div className="grid grid-rows-[6rem,1fr] bg-gradient-to-r from-white to-slate-50 h-screen">
      <div className="flex">
        <Link className="p-8 italic text-lg hover:text-gray-400" to={"/"}>
          Go Back
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center  ">
        <h2 className="font-bold text-4xl text-blue-900 mb-6">
          {product.title}
        </h2>
        <div className="flex justify-evenly items-center w-3/5 min-w-min max-w-8xl">
          <img
            className="text-center my-6 mx-6"
            src={product.image}
            alt="Product"
            width="300"
            height="300"
          />
          <p>{product.description}</p>
          <p className="text-2xl px-8 text-blue-900">
            &pound;&nbsp;{product.price}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
