import type { BookData } from "../../types/BookIt.ts"
import { useId, useState } from "react";


// import { bookStore } from "#/store/savedBookList.ts"
// import { useSelector } from '@tanstack/react-store'

import { ToggleSwitch } from "#/components/lib/ToggleSwitch.tsx"
import { Button } from "#/components/lib/Button"
import { StarRating } from '#/components/lib/StarRating'


interface BookListingProps {
  bookItem?: BookData
}

function BookListing({ bookItem }: BookListingProps) {
  const BookHeading = ({ children }: { children: React.ReactNode }) => <p className="font-bold">{children}</p>
  const BookItem = ({ bookDetails }: { bookDetails: string }) => <p>{bookDetails}</p>
  const BookTitle = ({ bookTitle }: { bookTitle: string }) => <a href={`book/${bookTitle}`}>{bookTitle}</a>

  const isItem = bookItem !== undefined
  const headingStyle = isItem ? "none" : "border-b"


  const [rating, setRating] = useState<number>(Number(bookItem?.desireRating ?? 0));
  const [obtained, setObtain] = useState<boolean>(bookItem?.hasObtain ?? false)


  function handleRatingChange(nextRating: string) {
    const value = Number(nextRating);

    setRating(value);
    // updateBook(bookItem.id, { desireRating: value });
  }

  function handleObtainedChange(nextObtained: boolean) {
    setObtain(nextObtained);
    // updateBook(bookItem.id, { hasObtain: nextObtained });
  }

  return (
    <li
      className={`grid grid-cols-[150px_1fr_1fr_1fr_50px]  text-left ${headingStyle} items-center`}
    >
      {isItem ? <ToggleSwitch obtained={obtained} onChange={handleObtainedChange} ></ToggleSwitch> : <BookHeading>Obtained</BookHeading>}
      {isItem ? <BookTitle bookTitle={bookItem?.title} /> : <BookHeading> Title</BookHeading>}
      {isItem ? <BookItem bookDetails={bookItem?.author} /> : <BookHeading>Author</BookHeading>}
      {isItem ? <StarRating value={rating} onChange={handleRatingChange} /> : <BookHeading>Desired Rating</BookHeading>}
      {isItem ? <Button buttonType="fill" >X</Button> : <BookHeading >Remove</BookHeading >}
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
      <BookListing key={0} />
      {
        desiredBooks.map((x: BookData) => <BookListing key={x.id} bookItem={x} />)
      }
    </ul>
  )
}
