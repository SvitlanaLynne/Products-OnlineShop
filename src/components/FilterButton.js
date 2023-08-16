function FilterButton({ category, isSelected, onClick }) {
  return (
    <div
      className={`filter-button ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(category)}
    >
      {isSelected && <span>✔</span>}
      {category}
    </div>
  );
}

export default FilterButton;
