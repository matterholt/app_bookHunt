import { createFileRoute } from '@tanstack/react-router'
import { useSelector } from '@tanstack/react-store'


import { bookStore } from "#/store/savedBookList"

import { Dialog } from "#/components/lib/Dialog"
import { Container } from '#/components/lib/Conatiner';

import { DesiredBookListing } from "#/features/desiredBookListing/DesiredBookListing"
import { AddABookForm } from '#/features/addABookForm/AddABookForm';
import { CollectionInfo } from '#/features/collectionInfo/CollectionInfo';
import { getBooks } from "#/serverActions/bookCollectionActions"
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
  loader: async () => {
    return getBooks()
  }, component: Home
})


function Home() {

  const serverBookList = Route.useLoaderData() || []
  const storeBookList = useSelector(bookStore, (state) => state['booklist'])

  useEffect(() => {

    bookStore.setState((state) => {
      const updates = { ...state, booklist: serverBookList }
      return updates
    })

  }, [serverBookList])



  return (
    <div className="bg-gray-800 h-full p-8 flex flex-col gap-2 ">
      <Container aColor='indigo' cssClass="p-10">
        <h1 className="text-4xl font-bold">BOOK HUNT</h1>
        <p className="mt-4 text-lg">
          A list of books to be tracked down and bought in a second hand bookshop
        </p>
      </Container>


      <Container aColor='purple'>
        < Dialog buttonLabel="Add Boook">
          {(closeDialog) =>
            <AddABookForm
              setDialogState={closeDialog}
            />}
        </Dialog>


      </Container>


      <Container aColor='fuchsia'>
        <div>
          <CollectionInfo savedBooks={storeBookList} />
        </div>
        <div className="p-10">
          <DesiredBookListing desiredBooks={storeBookList} />
        </div>
      </Container>

    </div >
  )
}
