import React, { useState } from "react";
import Meme from "./Meme";
import { useDropzone } from "react-dropzone";
import html2canvas from "html2canvas";
import "./App.css";

const App = () => {
  const [image, setImage] = useState(null);
  const [fontSize, setFontSize] = useState(32); // px
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(URL.createObjectURL(file)); // Create object URL for image preview
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  const downloadMeme = () => {
    const memeElement = document.querySelector(".meme");
    if (memeElement) {
      html2canvas(memeElement, { useCORS: true }).then((canvas) => {
        const link = document.createElement("a");
        link.download = "meme.png"; // You can change the file name here
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  const isReadyToDownload = image && (topText || bottomText);

  return (
    <div className="App">
      <h1>memegene</h1>

      <div {...getRootProps()} className="upload-area">
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select a file</p>
      </div>

      <div className="controls">
        <div className="input-area">
          <input
            type="text"
            placeholder="Top text"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bottom text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
          />
        </div>

        <div className="font-size-control">
          <label htmlFor="fontSize">Font Size: {fontSize}px</label>
          <input
            type="range"
            id="fontSize"
            name="fontSize"
            value={fontSize}
            min={10}
            max={72}
            step={2}
            onChange={(e) => setFontSize(e.target.value)}
          />
        </div>
      </div>

      {image && (
        <Meme
          image={image}
          topText={topText}
          bottomText={bottomText}
          fontSize={fontSize}
        />
      )}

      {image && (
        <div>
          <button onClick={downloadMeme} disabled={!isReadyToDownload}>
            Download
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
