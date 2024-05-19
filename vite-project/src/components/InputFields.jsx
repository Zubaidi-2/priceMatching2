export default function InputFields({
  placeholder,
  className,
  type = "number",
  number,
  ...props
}) {
  const handleKeyDown = (event) => {
    // Prevent changing values using arrow keys
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
    }
  };
  const numberOfBtns = number;
  const btns = Array.from({ length: numberOfBtns }, (_, i) => i);

  return (
    <div className="section">
      {btns.map((index) => (
        <input
          key={index}
          className={`${className} inputField`}
          type={type}
          onKeyDown={handleKeyDown}
          {...props}
        />
      ))}
    </div>
  );
}
