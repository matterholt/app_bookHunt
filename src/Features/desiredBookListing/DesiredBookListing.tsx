import type { BookData } from "../../types/BookIt.ts"


interface BookListingProps {
  bookItem?: BookData
}

function BookListing({ bookItem }: BookListingProps) {
  const BookObtained = ({ obtained }: { obtained: boolean }) => (<p>{obtained ? "yes" : "no"}</p>)
  const BookHeading = ({ headerTitle }: { headerTitle: string }) => <p className="font-bold">{headerTitle}</p>
  const BookItem = ({ bookDetails }: { bookDetails: string }) => <p>{bookDetails}</p>

  const isItem = bookItem !== undefined

  const headingStyle = isItem ? null : "border-b"

  return (
    <li
      className={`grid grid-cols-4 text-left ${headingStyle}`}
    >
      {isItem ? <BookItem bookDetails={bookItem?.title} /> : <BookHeading headerTitle="Title" />}
      {isItem ? <BookItem bookDetails={bookItem?.author} /> : <BookHeading headerTitle="Author" />}
      {isItem ? <BookItem bookDetails={String(bookItem?.desireRating)} /> : <BookHeading headerTitle="Desired Rating" />}
      {isItem ? <BookObtained obtained={bookItem.hasObtain} /> : <BookHeading headerTitle="Obtained" />}
    </li>
  )
}



interface DesiredBookListingProps {
  desiredBooks: BookData[]
}


export function DesiredBookListing({ desiredBooks }: DesiredBookListingProps) {

  if (desiredBooks.length === 0) {
    <div><p>No Books are in Play</p></div>
  }

  return (
    <ul>
      <BookListing />
      {
        desiredBooks.map((x: BookData) => <BookListing key={x.id} bookItem={x} />)
      }
    </ul>)
}
