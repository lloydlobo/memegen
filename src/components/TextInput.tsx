type TextInputProps = {
  id: string
  placeholder: string
  value: string
  fontSize: number
  onTextChange: (text: string) => void
  onFontSizeChange: (size: number) => void
}

export const TextInput = ({
  id,
  placeholder,
  value,
  fontSize,
  onTextChange,
  onFontSizeChange, //
}: TextInputProps) => {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>

      <div className="flex w-full items-center gap-2 rounded-lg border border-gray-300 p-2 transition focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 hover:border-gray-400">
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(ev) => onTextChange(ev.target.value)}
          className="flex-1 bg-transparent px-2 py-1 text-base text-gray-300 outline-none placeholder:text-gray-400"
        />

        <div className="flex items-center gap-1 rounded-md px-2 py-1 ring-gray-200 ring-inset focus-within:ring-1">
          <input
            type="number"
            min={10}
            max={72}
            value={fontSize}
            onChange={(ev) => onFontSizeChange(Number(ev.target.value))}
            className="w-12 bg-transparent text-right text-sm text-gray-400 outline-none"
          />
          <span className="text-xs text-gray-500">px</span>
        </div>
      </div>
    </div>
  )
}
