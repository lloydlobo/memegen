import React from "react"

import "./Meme.css"

export type MemeProps = {
  image: string | null
  topText: string
  bottomText: string
  topFontSize: number
  bottomFontSize: number
}

const textBase =
  "absolute left-1/2 -translate-x-1/2 font-extrabold text-white text-center " +
  "leading-tight whitespace-pre-wrap break-words max-w-[90%] " +
  "[text-shadow:2px_2px_4px_rgba(0,0,0,0.7)] " +
  "[-webkit-text-stroke:1.5px_black]"

function clamp(size: number) {
  return `clamp(${size * 0.6}px, ${size}px, ${size * 1.4}px)`
}

// html2canvas captures the entire #meme container, which includes:
//
// 1. The image (#meme-image)
// 2. The absolutely positioned text overlays (#meme-top-text, #meme-bottom-text)
const Meme = ({ image, topText, bottomText, topFontSize, bottomFontSize }: MemeProps) => {
  return image ? (
    <div id="meme" className="relative mt-5 inline-block">
      <img id="meme-image" src={image} alt="Meme" className="block h-auto w-175 object-contain" />

      <div id="meme-top-image" className={`${textBase} top-5`} style={{ fontSize: clamp(topFontSize) }}>
        {topText}
      </div>

      <div id="meme-bottom-image" className={`${textBase} bottom-5`} style={{ fontSize: clamp(bottomFontSize) }}>
        {bottomText}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default Meme
