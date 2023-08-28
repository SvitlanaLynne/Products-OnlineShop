function DropDownMenu({
  rowsNumber,
  handleOptionChange: handleRowOptionChange,
  rowsNumberArr,
}) {
  return (
    <div className="text-base text-blue-900 px-5">
      <label className="italic">Select the number of items to display</label>
      <select
        className="bg-transparent italic text-blue-900 font-bold p-2"
        value={rowsNumber}
        onChange={(event) => handleRowOptionChange(event)}
      >
        {rowsNumberArr.map((option) => {
          return (
            <option className="bg-transparent" key={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default DropDownMenu;
