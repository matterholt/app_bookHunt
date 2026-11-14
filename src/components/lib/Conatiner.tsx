
const colorProfile = ['indigo', 'teal', 'pink', 'purple', 'gray', 'red', 'lime', 'fuchsia', 'violet', 'gray'] as const
type ContainerColor = typeof colorProfile[number];


interface ContainerProps {
  aColor?: ContainerColor
  cssClass?: string
  children: React.ReactNode
}

function generateColor() {
  return new Map(colorProfile.map((x) =>
    [x, `bg-${x}-100 border-${x}-500 text-${x}-900`]))
}



export function Container({ aColor = 'gray', cssClass, children }: ContainerProps) {
  const colorContainer = generateColor()
  const styleSomething = `border-4 rounded-md text-center ${colorContainer.get(aColor)} ${cssClass ?? ""}`

  return (
    <div className={styleSomething}>
      {children}
    </div>
  )
}
