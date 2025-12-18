import React, { useEffect, useState } from "react"

import html2canvas from "html2canvas"
import { useDropzone } from "react-dropzone"

import "@/App.css"
import "@/styles/globals.css"

import { cn } from "@/lib/utils.ts"
import Meme from "@/Meme.tsx"
import { TextInput } from "@/components/TextInput.tsx"

type MemeState = {
  image: string | null
  topText: string
  bottomText: string
  topFontSize: number
  bottomFontSize: number
}

const App = () => {
  const [memeState, setMemeState] = useState<MemeState>({
    image: null,
    topFontSize: 20,
    bottomFontSize: 20,
    topText: "",
    bottomText: "",
  })

  const updateMeme = (
    patch: Partial<MemeState> //
  ) => setMemeState((memeState) => ({ ...memeState, ...patch }))

  const onDrop = (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return
    const file = acceptedFiles[0]
    updateMeme({ image: URL.createObjectURL(file) }) // create object URL for image preview
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: onDrop,
  })

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

  const isReadyToDownload = memeState.image && (memeState.topText || memeState.bottomText)

  useEffect(() => {
    const currentImage = memeState.image // avoid memory leak on unclosed URL.createObjectURL
    return () => {
      if (currentImage) {
        URL.revokeObjectURL(currentImage) // revoke the previous URL, not the current one
      }
    }
  }, [memeState.image])

  return (
    <div className={`mx-auto ${cn(!true ? "max-w-8xl" : "max-w-5xl")} p-0 text-center font-sans`}>
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
        {memeState.image && (
          <Meme
            image={memeState.image}
            topText={memeState.topText}
            bottomText={memeState.bottomText}
            topFontSize={memeState.topFontSize}
            bottomFontSize={memeState.bottomFontSize}
          />
        )}

        <div className="xs:max-w-sm w-full max-w-md">
          {/* Controls */}
          <div className="mb-6 flex flex-col gap-3">
            <TextInput
              id="topText"
              placeholder="Top text"
              value={memeState.topText}
              fontSize={memeState.topFontSize}
              onTextChange={(text) => updateMeme({ topText: text })}
              onFontSizeChange={(size) => updateMeme({ topFontSize: size })}
            />

            <TextInput
              id="bottomText"
              placeholder="Bottom text"
              value={memeState.bottomText}
              fontSize={memeState.bottomFontSize}
              onTextChange={(text) => updateMeme({ bottomText: text })}
              onFontSizeChange={(size) => updateMeme({ bottomFontSize: size })}
            />
          </div>

          {/* Download */}
          {memeState.image && (
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
