import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

function SortedColumn({ column, sortConfig, handleSort }) {
  const isSorted = column === sortConfig.column;

  const sortIcon = sortConfig.order === "asc" ? faCaretDown : faCaretUp;

  const handleHeaderClick = () => {
    if (isSorted) {
      handleSort({
        column: sortConfig.column,
        order: sortConfig.order === "asc" ? "desc" : "asc",
      });
    } else {
      handleSort({ column, order: "asc" });
    }
  };

  return (
    <th onClick={handleHeaderClick}>
      {column}
      {<FontAwesomeIcon icon={sortIcon} />}
    </th>
  );
}

export default SortedColumn;
