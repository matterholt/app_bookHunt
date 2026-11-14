import type { BookData } from '#/types/BookIt';
export const Route = createFileRoute('/')({ component: Home })

import { createFileRoute } from '@tanstack/react-router'
import { useRef, useState, useEffect } from 'react';



import { DesiredBookListing } from "#/Features/desiredBookListing/DesiredBookListing"
import { Dialog } from "#/components/lib/Dialog"
import { Container } from '#/components/lib/Conatiner';
import { AddABookForm } from '#/Features/addABookForm/AddABookForm';



interface InfoTabProps {
  savedBooks: BookData[]
}

function InfoTab({ savedBooks }: InfoTabProps) {

  const totalCount = savedBooks.length
  const bookGot = savedBooks.filter(x => x.hasObtain).length
  const bookDont = savedBooks.filter(x => !x.hasObtain).length

  return (
    <div className="p-5 flex justify-evenly">
      <p>Total Book Count : {totalCount}</p>
      <p>Total Book Captured : {bookGot}</p>
      <p>Total Book Free: {bookDont}</p>
    </div>
  )
}


function Home() {

  const [savedBooks, setSavedBooks] = useState<BookData[]>([
    { title: "Lonesome Dove", author: "Larry McMurtry", desireRating: 5, hasObtain: false, id: "qewr" },
    { title: "The Call of the Wild", author: "Jack London", desireRating: 4, hasObtain: true, id: "asdf" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", desireRating: 0, hasObtain: false, id: "okn" }]
  )

  const [status, setStatus] = useState("")



  function updateSavedBooks(newBook: BookData) {
    const addBook = { title: "The Road", author: "Cormac McCarthy", desireRating: 2, hasObtain: false, id: "asdfg3erg" }

    if (savedBooks.some(book => book.title === newBook.title)) {
      setStatus("isStoredBook")
      return
    }

    setSavedBooks([...savedBooks, newBook])
  }


  return (
    <div className="bg-gray-800 h-full p-8 flex flex-col gap-2">

      <Container aColor='indigo' cssClass="p-10">
        <h1 className="text-4xl font-bold">BOOK HUNT</h1>
        <p className="mt-4 text-lg">
          A list of books to be tracked down and bought in a second hand bookshop
        </p>
      </Container>


      <Container aColor='purple'>
        < Dialog buttonLabel="Add Boook">
          <AddABookForm />
        </Dialog>
        {status === "isStoredBook" ? <p className="text-red-700">Book has already in List</p> : null}
      </Container>


      <Container aColor='fuchsia'>
        <div>
          <InfoTab savedBooks={savedBooks} />
        </div>
        <div className="p-10">
          <DesiredBookListing desiredBooks={savedBooks} />
        </div>
      </Container>

    </div >
  )
}
