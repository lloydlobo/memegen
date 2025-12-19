import React, { useEffect, useState } from "react"

import html2canvas from "html2canvas"
import { useDropzone } from "react-dropzone"

import "@/App.css"
import "@/styles/globals.css"

import { TextInput } from "@/components/TextInput.tsx"
import { cn } from "@/lib/utils.ts"
import Meme from "@/Meme.tsx"

type MemeState = {
  image: string | null
  topText: string
  bottomText: string
  topFontSize: number
  bottomFontSize: number
}

type onImageUploadProps = {
  onImageUpload: (file: File) => void
}

const ImageUploader = ({ onImageUpload }: onImageUploadProps) => {
  const onDrop = (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return
    onImageUpload(acceptedFiles[0]) // callback to create object URL for image preview
  }
  const { getRootProps, getInputProps } = useDropzone({ accept: { "image/*": [] }, onDrop: onDrop })
  return (
    <div
      {...getRootProps()}
      className="mx-auto mb-6 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-gray-600 transition hover:border-gray-400"
    >
      <input {...getInputProps()} />
      <p className="text-gray-300">Drag & drop an image here, or click to select a file</p>
    </div>
  )
}

type MemeControlsProps = {
  memeState: MemeState
  updateMeme: (patch: Partial<MemeState>) => void
  downloadMeme: () => void
}

const MemeControls = ({ memeState, updateMeme, downloadMeme }: MemeControlsProps) => {
  const isReadyToDownload = Boolean(memeState.image && (memeState.topText || memeState.bottomText))
  const buttonClass = cn(
    "focus-ring-offset-2",
    "mt-6",
    "rounded",
    "bg-sky-600",
    "px-6",
    "py-3",
    "text-white",
    "transition",
    "hover:bg-sky-800",
    "focus:ring-2",
    "focus:ring-sky-500",
    "focus:outline-none",
    "disabled:cursor-not-allowed",
    "disabled:bg-gray-400",
    "sm:px-8",
    "sm:py-3"
  )
  return (
    <div className="xs:max-w-sm w-full max-w-md">
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
      {memeState.image && (
        <div className={memeState.image ? cn("flex", "gap-2") : ""}>
          <button onClick={downloadMeme} disabled={!isReadyToDownload} className={buttonClass}>
            Generate Meme
          </button>
          <button onClick={() => updateMeme({ image: null })} className={buttonClass}>
            Remove
          </button>
        </div>
      )}
    </div>
  )
}

const App = () => {
  const [memeState, setMemeState] = useState<MemeState>({
    image: null,
    topFontSize: 20,
    bottomFontSize: 20,
    topText: "",
    bottomText: "",
  })
  const updateMeme = (patch: Partial<MemeState>) => setMemeState((memeState) => ({ ...memeState, ...patch }))
  const handleImageUpload = (file: File) => updateMeme({ image: URL.createObjectURL(file) })
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
  useEffect(() => {
    const currentImage = memeState.image // avoid memory leak on unclosed URL.createObjectURL
    return () => {
      if (currentImage) {
        URL.revokeObjectURL(currentImage) // revoke the previous URL, not the current one
      }
    }
  }, [memeState.image])
  return (
    <div className="mx-auto max-w-5xl p-0 text-center font-sans">
      <h1 className="mb-6 text-3xl font-bold text-gray-300">memegene</h1>
      {!memeState.image && <ImageUploader onImageUpload={handleImageUpload} />}
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
        <MemeControls memeState={memeState} updateMeme={updateMeme} downloadMeme={downloadMeme} />
      </div>
      <footer className="mt-10 py-4 text-sm text-gray-500">
        <span>© {new Date().getFullYear()} Memegene. All rights reserved.</span>
      </footer>
    </div>
  )
}

export default App
