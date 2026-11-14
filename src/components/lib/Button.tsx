

interface ButtonProps {
  children: React.ReactNode
  handleClick: () => void; // not sure

}

export function Button({ handleClick, children }: ButtonProps) {
  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-30 m-2 rounded">{children}</button>
  )
}


