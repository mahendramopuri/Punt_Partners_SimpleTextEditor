import React, { useEffect, useState } from "react";
import SelectFont from "./SelectFont";
import fontsData from "../fonts.json";
import SelectFontWeight from "./SelectFontWeight";
import styles from "./Editor.module.css";

function Editor() {
  const [text, setText] = useState("");
  const [fontFamily, setFontFamily] = useState("Roboto");
  const [fontWeight, setFontWeight] = useState(400);
  const [isItalic, setIsItalic] = useState(false);
  const [fonts, setFonts] = useState([]);
  const [autoSaveMessage, setAutoSaveMessage] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [savedText, setSavedText] = useState("");

  const handleItalicChange = (e) => {
    setIsItalic(e.target.checked);
  };

  const toggleItalic = fonts.some(
    (variant) => variant.weight === fontWeight && variant.style === "italic"
  );

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    const savedText = localStorage.getItem("text") || "";
    const savedFontFamily = localStorage.getItem("fontFamily") || "Roboto";
    const savedFontWeight = localStorage.getItem("fontWeight") || 400;
    const savedIsItalic = localStorage.getItem("isItalic") === "true";

    setText(savedText);
    setFontFamily(savedFontFamily);
    setFontWeight(Number(savedFontWeight));
    setIsItalic(savedIsItalic);
  }, []);

  useEffect(() => {
    if (fontsData[fontFamily]) {
      setFonts(fontsData[fontFamily].variants);
      fontsData[fontFamily].urls.forEach((url) => {
        const link = document.createElement("link");
        link.href = url;
        link.rel = "stylesheet";
        document.head.appendChild(link);
      });
    }
  }, [fontFamily]);

  useEffect(() => {
    const saveToLocalStorage = () => {
      localStorage.setItem("text", text);
      localStorage.setItem("fontFamily", fontFamily);
      localStorage.setItem("fontWeight", fontWeight);
      localStorage.setItem("isItalic", isItalic);
      setAutoSaveMessage(true);
      setTimeout(() => setAutoSaveMessage(false), 2000);
    };

    const handleSaveDebounced = () => {
      const handler = setTimeout(() => {
        saveToLocalStorage();
      }, 4000);

      return () => {
        clearTimeout(handler);
      };
    };

    const cleanup = handleSaveDebounced();
    return cleanup;
  }, [text, fontFamily, fontWeight, isItalic]);

  const handleSave = () => {
    localStorage.setItem("text", text);
    localStorage.setItem("fontFamily", fontFamily);
    localStorage.setItem("fontWeight", fontWeight);
    localStorage.setItem("isItalic", isItalic);
    setSavedText(text);
    setSaveMessage("Your content is saved!");
    setTimeout(() => setSaveMessage(""), 2000);
  };

  const handleReset = () => {
    setText("");
    setFontFamily("Roboto");
    setFontWeight(400);
    setIsItalic(false);
    localStorage.removeItem("text");
    localStorage.removeItem("fontFamily");
    localStorage.removeItem("fontWeight");
    localStorage.removeItem("isItalic");
    setSavedText("");
    alert("Reset!");
  };

  return (
    <div className="App">
      <div className={styles.child}>
        <div className={styles.subChild}>
          <label>Font Family: </label>
          <SelectFont
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            data={Object.keys(fontsData)}
          />
        </div>
        <div className={styles.subChild}>
          <label>Font Weight: </label>
          <SelectFontWeight
            fontWeight={fontWeight}
            fonts={fonts}
            setFontWeight={setFontWeight}
            isItalic={isItalic}
            setIsItalic={setIsItalic}
          />
        </div>
        <div className={styles.subChild}>
          <label className={styles.label}>Italic: </label>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={isItalic}
              onChange={handleItalicChange}
              disabled={!toggleItalic}
            />
            <span className={styles.slider} />
          </label>
        </div>
      </div>
      <textarea
        value={text}
        onChange={handleTextChange}
        style={{
          fontFamily: fontFamily,
          fontWeight: fontWeight,
          fontStyle: isItalic ? "italic" : "normal",
          width: "100%",
          height: "300px",
          padding: "10px",
        }}
      />
      <button onClick={handleSave} className={styles.btn}>
        Save
      </button>
      <button onClick={handleReset} className={styles.btn}>
        Reset
      </button>
      {autoSaveMessage && <h4>Auto save</h4>}
      {saveMessage && <h4>{saveMessage}</h4>}
      {savedText && <p>{savedText}</p>}
    </div>
  );
}

export default Editor;
