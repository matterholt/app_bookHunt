import { Button } from "#/components/lib/Button"
import { useEffect, useRef, useState } from "react"

import { addBook } from "#/serverActions/bookCollectionActions"

function SelectOptions() {
  const ratingRange = Array.from({ length: 6 }, (_, i) => i)

  return (
    <label className="flex justify-between " htmlFor="desiredLevel">
      Desired Level
      <select id="desiredLevel" name="desiredLevel" className=" w-1/2 p-2 text-center rounded bg-white">
        {ratingRange.map((x) => <option key={x} value={x}>{x}</option>
        )}
      </select>
    </label>
  )
}


interface TextInputProps {
  lables: { id: string, placeHolder: string, label: string }
}

function TextInput({ lables }: TextInputProps) {
  const [value, setValue] = useState<string>("")

  function handleValueUpdate(e) {
    setValue(e.target.value)
  }


  return (
    <label className="flex justify-between " htmlFor={lables.id}>{lables.label}
      <input className="rounded bg-white p-2" id={lables.id} name={lables.id} type="text" placeholder={lables.placeHolder} onChange={handleValueUpdate} />
    </label>
  )
}





interface AddABookFormProps {

}

export function AddABookForm({ setDialogState }) {

  const [status, setStatus] = useState("idle")

  const formField = useRef<HTMLFormElement>(null)

  function resetForm() {
    if (!formField.current) return
    formField?.current.reset()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!formField.current) return

    const formData = new FormData(formField?.current);
    const bookTitle = formData.get("bookTitle") as string
    const authorName = formData.get("authorName") as string

    if ([bookTitle, authorName].some(x => x === "")) {
      setStatus("missingInput")
      return
    }

    const bookData = {
      title: bookTitle,
      author: authorName,
      hasObtain: false,
      desiredRating: Number(formData.get("desiredLevel"))
    };


    const serverResults = await addBook({
      data: bookData
    })

    setStatus(serverResults.status)
    resetForm()
    setDialogState()
  }

  return (
    <form ref={formField} onSubmit={handleSubmit} className="flex flex-col w-full gap-5 p-5">
      <TextInput lables={{ id: "bookTitle", placeHolder: "Book Title", label: "Book Title" }} />
      <TextInput lables={{ id: "authorName", placeHolder: "Author", label: "Author Name" }} />
      <SelectOptions />
      <Button type="submit">
        submit
      </Button>

    </form>
  )
}
