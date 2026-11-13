import type { BookData } from "../../types/BookIt.ts"


interface DesiredBookListingProps {
  desiredBooks: BookData[]
}


interface BookListingProps {
  bookItem: BookData

}



function BookListing({ bookItem }: BookListingProps) {
  return (
    <li key={bookItem.id}>{bookItem.title} , {bookItem.author}, {bookItem.desireRating}, {bookItem.hasObtain ? "have" : "have not"}</li>
  )
}




// {savedBooks.length !== 0 ? (<BookList bookList={savedBooks} />) : (<AddABook />)}
export function DesiredBookListing({ desiredBooks }: DesiredBookListingProps) {

  if (desiredBooks.length === 0) {
    <div><p>No Books are in Play</p></div>
  }

  return (
    <ul>
      {
        desiredBooks.map((x: BookData) => <BookListing bookItem={x} />)
      }
    </ul>)
}
