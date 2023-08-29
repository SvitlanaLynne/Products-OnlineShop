import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function ProductRow({ product }) {
  return (
    <tr key={product.id}>
      <td className="text-center">{product.id}</td>
      <td>
        <Link className="hover:text-gray-600" to={`/product/${product.id}`}>
          {product.title}
        </Link>
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
        &pound;&nbsp;{product.price}
      </td>
      <td className="text-sm text-center text-green-800 italic">
        <FontAwesomeIcon icon={faStar} size="xs" />
        &nbsp;
        {product.rating.rate}
      </td>
    </tr>
  );
}

export default ProductRow;
