import React from "react";
import styles from "./Select.module.css";

function SelectFont({ fontFamily, setFontFamily, data }) {
  // console.log(data);
  const handelFontChange = (e) => {
    // console.log(e.target.value);
    setFontFamily(e.target.value);
  };
  return (
    <select
      value={fontFamily}
      onChange={handelFontChange}
      className={styles.Select}
    >
      {data.map((ele, i) => (
        <option key={i} value={ele}>
          {ele}
        </option>
      ))}
    </select>
  );
}

export default SelectFont;
