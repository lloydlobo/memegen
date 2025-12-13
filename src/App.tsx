import React, { useState } from "react"

import html2canvas from "html2canvas"
import { useDropzone } from "react-dropzone"

import "./App.css"
import Meme from "./Meme"

const App = () => {
  const [image, setImage] = useState(null)
  const [topFontSize, setTopFontSize] = useState(32) // px
  const [bottomFontSize, setBottomFontSize] = useState(32) // px
  const [topText, setTopText] = useState("")
  const [bottomText, setBottomText] = useState("")

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    setImage(URL.createObjectURL(file)) // Create object URL for image preview
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  })

  const downloadMeme = () => {
    const memeElement = document.querySelector(".meme")
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
    <div className="mx-auto max-w-5xl p-0 text-center font-sans">
      <h1 className="mb-6 text-3xl font-bold">memegene</h1>

      {/* Upload */}
      <div
        {...getRootProps()}
        className="mx-auto mb-6 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-gray-600 transition hover:border-gray-400"
      >
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select a file</p>
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
        <div className="w-full max-w-sm">
          {/* Text Inputs */}
          <div className="mb-6 flex flex-col gap-3">
            <div className="flex">
              <input
                type="text"
                placeholder="Top text"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                className="w-full rounded border-gray-300 p-2 focus:border-sky-500 focus:outline-none"
              />

              <label htmlFor="topFontSize">
                <input
                  id="topFontSize"
                  name="topFontSize"
                  type="number"
                  value={topFontSize}
                  onChange={(ev) => setTopFontSize(Number(ev.target.value))}
                  min={10}
                  max={72}
                  className="w-32 rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </label>
            </div>

            <div className="flex">
              <input
                type="text"
                placeholder="Bottom text"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                className="w-full rounded border-gray-300 p-2 focus:border-sky-500 focus:outline-none"
              />

              <label htmlFor="bottomFontSize">
                <input
                  id="bottomFontSize"
                  name="bottomFontSize"
                  type="number"
                  value={bottomFontSize}
                  onChange={(ev) => setBottomFontSize(Number(ev.target.value))}
                  min={10}
                  max={72}
                  className="w-32 rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </label>
            </div>
          </div>

          {/* Download */}
          {image && (
            <div>
              <button
                onClick={downloadMeme}
                disabled={!isReadyToDownload}
                className="mt-6 rounded bg-sky-700 px-6 py-3 text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-gray-400 sm:px-8 sm:py-3"
              >
                Generate Meme
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
