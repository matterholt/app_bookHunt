import type { BookData } from "../../types/BookIt.ts"


interface DesiredBookListingProps {
  desiredBooks: BookData[]
}


interface BookListingProps {
  bookItem: BookData

}



function BookListing({ bookItem }: BookListingProps) {
  return (
    <li key={bookItem.id}
      className="grid grid-cols-4 text-left"
    >
      <p></p>
      <p>
        {bookItem.title}
      </p>
      <p>
        {bookItem.author}
      </p>
      <p>
        {bookItem.desireRating}
      </p>
      <p>
        {bookItem.hasObtain ? "have" : "have not"}
      </p></li>
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
