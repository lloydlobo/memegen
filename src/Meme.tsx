// html2canvas captures the entire #meme container, which includes:
// 1. The image (#meme-image)
// 2. The absolutely positioned text overlays (#meme-top-text, #meme-bottom-text)
import React from "react"

import { MemeText } from "@/components/MemeText.tsx"
import { MEME_CONFIG } from "@/lib/config"

type MemeProps = {
  image: string | null
  topText: string
  bottomText: string
  topFontSize: number
  bottomFontSize: number
}

const Meme = ({ image, topText, bottomText, topFontSize, bottomFontSize }: MemeProps) => {
  if (!image) return null
  return (
    <div id="meme" className="relative mt-5 inline-block">
      <img id="meme-image" src={image} alt="Meme" className={`${MEME_CONFIG.imageWidth} block h-auto object-contain`} />
      <MemeText text={topText} fontSize={topFontSize} position="top" />
      <MemeText text={bottomText} fontSize={bottomFontSize} position="bottom" />
    </div>
  )
}

export default Meme
