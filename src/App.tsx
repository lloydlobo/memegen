import React, { useState } from "react"

import html2canvas from "html2canvas"
import { useDropzone } from "react-dropzone"

import "@/App.css"
import Meme from "@/Meme.tsx"
import "@/styles/globals.css"

const App = () => {
  const [image, setImage] = useState<string | null>(null)
  const [topFontSize, setTopFontSize] = useState(20) // px
  const [bottomFontSize, setBottomFontSize] = useState(20) // px
  const [topText, setTopText] = useState("")
  const [bottomText, setBottomText] = useState("")

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImage(URL.createObjectURL(file)) // Create object URL for image preview
  }

  const { getRootProps, getInputProps } = useDropzone({ accept: "image/*", onDrop })

  const downloadMeme = () => {
    const memeElement = document.querySelector("#meme") as HTMLDivElement
    if (memeElement) {
      html2canvas(memeElement, { useCORS: true }).then((canvas) => {
        const link = document.createElement("a")
        link.download = "meme.png" // You can change the file name here
        link.href = canvas.toDataURL()
        link.click()
      })
    }
  }

  const isReadyToDownload = image && (topText || bottomText)

  return (
    <div className={`mx-auto ${true ? "max-w-8xl" : "max-w-5xl"} p-0 text-center font-sans`}>
      <h1 className="mb-6 text-3xl font-bold text-gray-300">memegene</h1>
      {/* Upload */}
      <div
        {...getRootProps()}
        className="mx-auto mb-6 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-gray-600 transition hover:border-gray-400"
      >
        <input {...getInputProps()} />
        <p className="text-gray-300">Drag & drop an image here, or click to select a file</p>
      </div>

      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
        {image && (
          <Meme
            image={image}
            topText={topText}
            bottomText={bottomText}
            topFontSize={topFontSize}
            bottomFontSize={bottomFontSize}
          />
        )}

        {/* Controls */}
        <div className="xs:max-w-sm w-full max-w-md">
          {/* Text Inputs */}
          <div className="mb-6 flex flex-col gap-3">
            {/* Top */}
            <div className="space-y-1">
              <label htmlFor="topText" className="sr-only text-base font-medium text-gray-600">
                Top text
              </label>
              <div className="flex w-full items-center gap-2 rounded-lg border border-gray-300 p-2 transition focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 hover:border-gray-400">
                <input
                  id="topText"
                  type="text"
                  placeholder="Top text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  className="flex-1 bg-transparent px-2 py-1 text-base text-gray-300 outline-none placeholder:text-gray-400"
                />

                <div className="flex items-center gap-1 rounded-md px-2 py-1 ring-gray-200 ring-inset focus-within:ring-1">
                  <input
                    type="number"
                    min={10}
                    max={72}
                    value={topFontSize}
                    onChange={(ev) => setTopFontSize(Number(ev.target.value))}
                    className="w-12 bg-transparent text-right text-sm text-gray-400 outline-none"
                  />
                  <span className="text-xs text-gray-500">px</span>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="space-y-1">
              <label htmlFor="bottomText" className="sr-only text-base font-medium text-gray-600">
                Bottom text
              </label>
              <div className="flex w-full items-center gap-2 rounded-lg border border-gray-300 p-2 transition focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 hover:border-gray-400">
                <input
                  id="bottomText"
                  type="text"
                  placeholder="Bottom text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  className="flex-1 bg-transparent px-2 py-1 text-base text-gray-300 outline-none placeholder:text-gray-400"
                />

                <div className="flex items-center gap-1 rounded-md px-2 py-1 ring-gray-200 ring-inset focus-within:ring-1">
                  <input
                    type="number"
                    min={10}
                    max={72}
                    value={bottomFontSize}
                    onChange={(ev) => setBottomFontSize(Number(ev.target.value))}
                    className="w-12 bg-transparent text-right text-sm text-gray-400 outline-none"
                  />
                  <span className="text-xs text-gray-500">px</span>
                </div>
              </div>
            </div>
          </div>

          {/* Download */}
          {image && (
            <div>
              <button
                onClick={downloadMeme}
                disabled={!isReadyToDownload}
                className="focus-ring-offset-2 mt-6 rounded bg-sky-600 px-6 py-3 text-white transition hover:bg-sky-800 focus:ring-2 focus:ring-sky-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400 sm:px-8 sm:py-3"
              >
                Generate Meme
              </button>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-10 py-4 text-sm text-gray-500">
        <span>© {new Date().getFullYear()} Memegene. All rights reserved.</span>
      </footer>
    </div>
  )
}

export default App
