import { useState } from "react";

function DropDownMenu() {
  const options = [3, 5, 10];

  const [optionSelected, setSelectedOption] = useState(
    options[options.length - 1]
  );
  const handleOptionChange = (event) => {
    console.log("event looks like this:", event);
    const selectedValue = parseInt(event.target.value);
    console.log("parsed even is:", selectedValue);
    setSelectedOption(selectedValue);
  };

  return (
    <>
      <div className="dropDownButton">Selected option {optionSelected}</div>
      <label>Select the number of rows</label>
      <select value={optionSelected} onChange={handleOptionChange}>
        {options.map((option) => {
          return <option key={option}>{option}</option>;
        })}
      </select>
    </>
  );
}

export default DropDownMenu;
