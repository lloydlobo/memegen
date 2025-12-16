// html2canvas captures the entire #meme container, which includes:
// 1. The image (#meme-image)
// 2. The absolutely positioned text overlays (#meme-top-text, #meme-bottom-text)
import React from "react"

const MEME_CONFIG = {
  textTopPadding: "top-5",
  textBottomPadding: "bottom-5",
  imageWidth: "w-175",
  strokeWidth: "1.5px",
  clampMin: 0.8,
  clampMax: 1.2,
} as const

const textBase =
  "font-extrabold text-white text-center " +
  "leading-tight whitespace-pre-wrap break-words max-w-[90%] " +
  "[text-shadow:2px_2px_4px_rgba(0,0,0,0.7)] " +
  `[-webkit-text-stroke:${MEME_CONFIG.strokeWidth}_black]`

const textBaseFixed = `absolute left-1/2 -translate-x-1/2 ${textBase}`

function clampCss(preferredVw: number, minPx?: number, maxPx?: number) {
  const min = minPx ?? preferredVw * MEME_CONFIG.clampMin
  const max = maxPx ?? preferredVw * MEME_CONFIG.clampMax
  return `clamp(${min}px, ${preferredVw}vw, ${max}px)` // proper min < preferred < max
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
  const positionClass = position === "top" ? MEME_CONFIG.textTopPadding : MEME_CONFIG.textBottomPadding

  return (
    <div className={`${textBaseFixed} ${positionClass}`} style={{ fontSize: clampCss(fontSize) }}>
      {text}
    </div>
  )
}

const Meme = ({ image, topText, bottomText, topFontSize, bottomFontSize }: MemeProps) => {
  if (!image) return null

  return (
    <div id="meme" className="relative mt-5 inline-block">
      <img id="meme-image" src={image} alt="Meme" className="${MEME_CONFIG.imageWidth} block h-auto object-contain" />
      <MemeText text={topText} fontSize={topFontSize} position="top" />
      <MemeText text={bottomText} fontSize={bottomFontSize} position="bottom" />
    </div>
  )
}

export default Meme
