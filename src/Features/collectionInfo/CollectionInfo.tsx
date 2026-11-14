
import type { BookData } from '#/types/BookIt';

interface CollectionInfoProps {
  savedBooks: BookData[]
}

export function CollectionInfo({ savedBooks }: CollectionInfoProps) {

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
