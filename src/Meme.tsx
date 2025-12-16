// html2canvas captures the entire #meme container, which includes:
// 1. The image (#meme-image)
// 2. The absolutely positioned text overlays (#meme-top-text, #meme-bottom-text)

import React from "react"

import "./Meme.css"

const textBase =
  "font-extrabold text-white text-center " +
  "leading-tight whitespace-pre-wrap break-words max-w-[90%] " +
  "[text-shadow:2px_2px_4px_rgba(0,0,0,0.7)] " +
  "[-webkit-text-stroke:1.5px_black]"

const textBaseFixed = "absolute left-1/2 -translate-x-1/2 " + textBase

function clamp(size: number) {
  return `clamp(${size * 0.6}px, ${size * 1.0}vw, ${size * 1.4}px)`
}

type MemeProps = {
  image: string | null
  topText: string
  bottomText: string
  topFontSize: number
  bottomFontSize: number
}

type MemeTextProps = {
  text: string
  fontSize: number
  position: "top" | "bottom"
}

const MemeText = ({ text, fontSize, position }: MemeTextProps) => {
  return (
    <div
      className={`${textBaseFixed} ${position === "top" ? "top-5" : "bottom-5"}`}
      style={{ fontSize: clamp(fontSize) }}
    >
      {text}
    </div>
  )
}

const Meme = ({ image, topText, bottomText, topFontSize, bottomFontSize }: MemeProps) => {
  if (!image) return null

  return (
    <div id="meme" className="relative mt-5 inline-block">
      <img id="meme-image" src={image} alt="Meme" className="block h-auto w-175 object-contain" />

      {topText && <MemeText text={topText} fontSize={topFontSize} position="top" />}
      {bottomText && <MemeText text={bottomText} fontSize={bottomFontSize} position="bottom" />}
    </div>
  )
}

export default Meme
