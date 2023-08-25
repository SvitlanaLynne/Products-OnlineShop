function FilterButton({ category, isSelected, onClick }) {
  return (
    <div
      className="flex-1 max-w-lg text-center"
      onClick={() => onClick(category)}
    >
      {isSelected && <span>✔</span>}
      {category}
    </div>
  );
}

export default FilterButton;
