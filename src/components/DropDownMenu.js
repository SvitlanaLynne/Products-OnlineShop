function DropDownMenu({ rowsNumber, handleOptionChange, rowsNumberArr }) {
  return (
    <>
      <div className="dropDownButton">Selected option {rowsNumber}</div>
      <label>Select the number of rows</label>
      <select
        value={rowsNumber}
        onChange={(event) => handleOptionChange(event)}
      >
        {rowsNumberArr.map((option) => {
          return <option key={option}>{option}</option>;
        })}
      </select>
    </>
  );
}

export default DropDownMenu;
