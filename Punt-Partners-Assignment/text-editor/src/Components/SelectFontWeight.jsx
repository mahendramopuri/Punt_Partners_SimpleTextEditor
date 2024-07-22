import React from "react";
import styles from "./Select.module.css";

function SelectFontWeight({
  fontWeight,
  setFontWeight,
  fonts,
  isItalic,
  setIsItalic,
}) {
  console.log(fonts);
  const handelWeightChange = (e) => {
    const weight = Number(e.target.value);
    setFontWeight(weight);

    const checkItalic = fonts.some(
      (f) => f.weight === weight && f.style === "italic"
    );
    if (!checkItalic && isItalic) {
      setIsItalic(false);
    }
  };

  return (
    <select
      value={fontWeight}
      onChange={handelWeightChange}
      className={styles.Select}
    >
      {fonts.map((variant, i) => (
        <option key={i} value={variant.weight}>
          {variant.weight}
          {variant.style === "italic" ? "(Italic)" : ""}
        </option>
      ))}
    </select>
  );
}

export default SelectFontWeight;
