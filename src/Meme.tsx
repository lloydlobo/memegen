import React from "react"
import "./Meme.css"

// html2canvas captures the entire .meme container, which includes:
//   1. The image (.meme-image)
//   2. The absolutely positioned text overlays (.top-text, .bottom-text)
const Meme = ({ image, topText, bottomText, topFontSize, bottomFontSize }) => {
  return (
    <div className="meme">
      <img src={image} alt="Meme" className="meme-image" />
      <div className="top-text" style={{ fontSize: `${topFontSize}px` }}>
        {topText}
      </div>
      <div className="bottom-text" style={{ fontSize: `${bottomFontSize}px` }}>
        {bottomText}
      </div>
    </div>
  )
}

export default Meme
