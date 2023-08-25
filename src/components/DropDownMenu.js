function DropDownMenu({
  rowsNumber,
  handleOptionChange: handleRowOptionChange,
  rowsNumberArr,
}) {
  return (
    <>
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
    </>
  );
}

export default DropDownMenu;
