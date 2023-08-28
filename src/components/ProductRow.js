import { Link } from "react-router-dom";

function ProductRow({ product }) {
  return (
    <tr key={product.id}>
      <td className="text-center">{product.id}</td>
      <td>
        <Link to={`/product/${product.id}`}>{product.title}</Link>
      </td>
      <td>
        <img
          className="text-center my-6"
          src={product.image}
          alt="Product"
          width="100"
          height="100"
        />
      </td>
      <td className=" text-lg text-center  text-blue-900 font-bold">
        {product.price}
      </td>
      <td className="text-sm text-center text-green-800 italic">
        {product.rating.rate}
      </td>
    </tr>
  );
}

export default ProductRow;
