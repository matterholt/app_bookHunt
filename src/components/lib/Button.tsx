

interface ButtonProps {
  children: React.ReactNode
  cssClass?: string
  handleClick?: () => void; // not sure
  buttonType?: 'base' | 'dialog' | "fill"
  type?: "submit" | "button"
}



export function Button({ buttonType = 'base', type = "button", cssClass, handleClick, children }: ButtonProps) {
  const baseCss = "bg-blue-600 text-white rounded-md hover:bg-blue-700 transition rounded"

  const figureButtonType = () => {
    if (buttonType === 'base') {
      return "px-4 py-2 w-30 m-2"
    }
    if (buttonType === 'fill') {
      return "px-4 py-2 m-2 grid place-self-center"
    }
    if (buttonType === 'dialog') {
      return "w-[25px] h-[25px] self-end"

    }
  }


  return (
    <button
      type={type}
      onClick={handleClick}
      className={[baseCss, figureButtonType(), cssClass].join(" ")}>{children}</button>
  )
}


