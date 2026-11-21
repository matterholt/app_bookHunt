import React, { useRef, useEffect } from "react";

import { Button } from "./Button.tsx"
import { Container } from "./Conatiner.tsx";



interface DialogProps {
  children: (closeDialog: () => void) => React.ReactNode;
  buttonLabel: string
}


export function Dialog({ buttonLabel = "open", children }: DialogProps) {

  const dialogRef = useRef<HTMLDialogElement>(null)

  const openDialog = () => {
    dialogRef.current?.showPopover();
  }

  const closeDialog = () => {
    dialogRef.current?.hidePopover();
  }


  return (
    <>
      <Button handleClick={openDialog}>
        {buttonLabel}
      </Button>

      <dialog
        popover="auto"
        className="         
      m-auto
      w-[90%] max-w-md
      rounded-xl
      bg-white
      p-6
      shadow-2xl
      backdrop:bg-black/50
      backdrop:backdrop-blur-sm" ref={dialogRef}>
        <Container aColor="teal" >
          <div className="flex flex-col">
            <Button buttonType="dialog" handleClick={closeDialog}>
              X
            </Button>
            {children(closeDialog)}
          </div>
        </Container>
      </dialog>
    </ >
  )
}
