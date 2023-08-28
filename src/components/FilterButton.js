function FilterButton({ category, isSelected, onClick }) {
  return (
    <div className="flex px-6" onClick={() => onClick(category)}>
      {isSelected && <span className="px-2">✔</span>}
      {category}
    </div>
  );
}

export default FilterButton;
