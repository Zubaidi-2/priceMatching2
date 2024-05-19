import "./Radio.css";
export default function RadioInputs({
  selectedRadioInputs,
  handleRadioChange,
}) {
  const handleClick = (index) => {
    console.log("Radio input clicked:", index);
    handleRadioChange(index);
  };

  return (
    <div key={selectedRadioInputs.join("-")}>
      {selectedRadioInputs.map((isSelected, index) => (
        <div key={index}>
          <input
            type="radio"
            checked={isSelected}
            onClick={() => handleClick(index)}
            className="radioInput"
          />
        </div>
      ))}
    </div>
  );
}
