import { Link } from "react-router-dom";

function ProductRow({ product }) {
  return (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>
        <Link to={`/product/${product.id}`}>{product.title}</Link>
      </td>
      <td>
        <img src={product.image} alt="Product" width="100" height="100" />
      </td>
      <td>{product.price}</td>
      <td>{product.rating.rate}</td>
    </tr>
  );
}

export default ProductRow;
