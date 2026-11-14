import type { BookData } from '#/types/BookIt';

import { createFileRoute } from '@tanstack/react-router'
import { useRef, useState, useEffect } from 'react';


import { Dialog } from "#/components/lib/Dialog"
import { Container } from '#/components/lib/Conatiner';

import { DesiredBookListing } from "#/features/desiredBookListing/DesiredBookListing"
import { AddABookForm } from '#/features/addABookForm/AddABookForm';
import { CollectionInfo } from '#/features/collectionInfo/CollectionInfo';

import { getBooks } from "#/serverActions/bookCollectionActions"

export const Route = createFileRoute('/')({
  loader: async () => {
    // Load jokes data when the route is accessed
    return getBooks()
  }, component: Home
})


function Home() {

  const savedBooks = Route.useLoaderData() || []

  const [status, setStatus] = useState("")



  //TODO: 
  //
  // function updateSavedBooks(newBook: BookData) {
  //   const addBook = { title: "The Road", author: "Cormac McCarthy", desireRating: 2, hasObtain: false, id: "asdfg3erg" }
  //
  //   if (savedBooks.some(book => book.title === newBook.title)) {
  //     setStatus("isStoredBook")
  //     return
  //   }
  //
  //   setSavedBooks([...savedBooks, newBook])
  // }
  //

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
          <CollectionInfo savedBooks={savedBooks} />
        </div>
        <div className="p-10">
          <DesiredBookListing desiredBooks={savedBooks} />
        </div>
      </Container>

    </div >
  )
}
