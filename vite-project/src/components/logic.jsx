import React, { useState, useEffect } from "react";
import "./logic.css";
import InputFields from "./InputFields";
import RadioInputs from "./RadioInputs"; // Import the RadioInputs component

// Define input and refund objects
const inputObject = {
  first: { index: 0, value: 0 },
  second: { index: 1, value: 0 },
  third: { index: 2, value: 0 },
  fourth: { index: 3, value: 0 },
  fifth: { index: 4, value: 0 },
  sixth: { index: 5, value: 0 },
  seventh: { index: 6, value: 0 },
  eighth: { index: 7, value: 0 },
  ninth: { index: 8, value: 0 },
  tenth: { index: 9, value: 0 },
  eleventh: { index: 10, value: 0 },
  twelfth: { index: 11, value: 0 },
  thirteen: { index: 12, value: 0 },
  fourteen: { index: 13, value: 0 },
  fifteen: { index: 14, value: 0 },
  sixteen: { index: 15, value: 0 },
  seventeen: { index: 16, value: 0 },
  eighteen: { index: 17, value: 0 },
  nineteen: { index: 18, value: 0 },
  twenty: { index: 19, value: 0 },
  twentyone: { index: 20, value: 0 },
};

const refundObject = {
  first: { index: 21, value: 0 },
  second: { index: 22, value: 0 },
  third: { index: 23, value: 0 },
  fourth: { index: 24, value: 0 },
  fifth: { index: 25, value: 0 },
  sixth: { index: 26, value: 0 },
  seventh: { index: 27, value: 0 },
  eighth: { index: 28, value: 0 },
  ninth: { index: 29, value: 0 },
  tenth: { index: 30, value: 0 },
  eleventh: { index: 31, value: 0 },
  twelfth: { index: 32, value: 0 },
  thirteen: { index: 33, value: 0 },
  fourteen: { index: 34, value: 0 },
  fifteen: { index: 35, value: 0 },
  sixteen: { index: 36, value: 0 },
  seventeen: { index: 37, value: 0 },
  eighteen: { index: 38, value: 0 },
  nineteen: { index: 39, value: 0 },
  twenty: { index: 40, value: 0 },
  twentyone: { index: 41, value: 0 },
};

export default function Logic({ ...props }) {
  const [ratio, setRatio] = useState(1);
  const [refund, setRefund] = useState(
    Object.values(refundObject).map((elem) => elem.value)
  );
  const [partValue, setPartValue] = useState(
    Object.values(inputObject).map((val) => val.value)
  );
  const [kitAmount, setKitAmount] = useState(0);
  const [selectedRadioInputs, setSelectedRadioInputs] = useState(
    Array(partValue.length).fill(false)
  );

  // Calculate refund amounts based on input values
  function handleOnChange(value, index) {
    // Remove "$" symbol if present and then convert to number
    const newValue = Number(value.replace(/\$/g, ""));
    const newPartValues = [...partValue];
    newPartValues[index] = isNaN(newValue) ? 0 : newValue;
    setPartValue(newPartValues);
  }

  // Calculate ratio and update refund amounts when part values or kit amount change
  useEffect(() => {
    const partTotalPrice = partValue.reduce((a, b) => Number(a) + Number(b), 0);
    const newRatio =
      partTotalPrice !== 0 ? Number(kitAmount) / partTotalPrice : 0;
    setRatio(newRatio);
    const newRefundValues = partValue.map(
      (value, index) => newRatio * Number(value) * 0.9
    );
    setRefund(newRefundValues);
  }, [partValue, kitAmount]);

  // Update kit amount state
  function handleKitChange(event) {
    // Remove "$" symbol if present and then convert to number
    const newValue = Number(event.target.value.replace(/\$/g, ""));
    setKitAmount(isNaN(newValue) ? 0 : newValue);
  }

  // Handle radio input change
  // Handle radio input change
  const handleRadioChange = (index) => {
    setSelectedRadioInputs((prevState) => {
      return prevState.map((isSelected, idx) => {
        return idx === index ? !isSelected : isSelected;
      });
    });
  };

  // Calculate total refund from selected radio inputs
  const totalRefund = selectedRadioInputs.reduce((total, isSelected, index) => {
    return isSelected ? total + refund[index] : total;
  }, 0);

  // Calculate deduction amount (kit price - total refund)
  const deductionAmount = kitAmount - totalRefund;

  // Render input fields for part numbers and refund amounts
  const partNumbers = Object.values(inputObject).map((elem, index) => (
    <div key={elem.index}>
      <InputFields
        number={1}
        className="part-numbers"
        value={partValue[index] === 0 ? "" : partValue[index]}
        onChange={(e) => handleOnChange(e.target.value, index)}
      />
    </div>
  ));

  const refundAmounts = refund.map((value, index) => (
    <div key={index + 50}>
      <InputFields number={1} className="part-numbers" value={value} readOnly />
    </div>
  ));

  return (
    <div className="input-grid">
      <div>
        <h3>KIT PRICE</h3>
        <input
          type="text" // Use text type to allow for "$" symbol
          value={kitAmount === 0 ? "" : `$${kitAmount}`} // Add "$" symbol
          className="kit-price"
          onChange={handleKitChange}
        />
        <div className="total">
          Total Refund: ${Number(totalRefund).toFixed(2)}
        </div>
        <div className="total">
          Deduction Amount: ${Number(deductionAmount).toFixed(2)}
        </div>
      </div>
      <div>
        <h3>PART NUMBERS</h3>

        <InputFields
          number={21}
          className="part-numbers"
          value=""
          onChange={(e) => {
            e.target.value;
          }}
        />
      </div>

      <div>
        <h3>PART PRICES</h3>

        {partNumbers}
      </div>

      <div>
        <h3>REFUND AMOUNT</h3>

        {refundAmounts}
      </div>

      <div>
        <h3>REFUND?</h3>

        <RadioInputs
          selectedRadioInputs={selectedRadioInputs}
          handleRadioChange={handleRadioChange} // Use handleRadioChange for radio inputs
        />
      </div>
    </div>
  );
}
