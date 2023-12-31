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
    <th className="px-4 py-6 font-light" onClick={handleHeaderClick}>
      {column}&nbsp;
      {<FontAwesomeIcon icon={sortIcon} />}
    </th>
  );
}

export default SortedColumn;
