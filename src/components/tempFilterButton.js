function FilterButton({ option, isSelected, onClick }) {
  return (
    <div
      className={`filter-button ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(option.id)}
    >
      {isSelected && <span>✔</span>}
      {option.label}
    </div>
  );
}

export default FilterButton;
