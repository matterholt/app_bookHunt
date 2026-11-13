import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/')({ component: Home })



interface BookData {
  id: string
  title: string
  author: string
  desireRating: number
  hasObtain: boolean
}
interface BookListProps {
  bookList: BookData[]
}



function BookList({ bookList }: BookListProps) {
  return (
    <ul>
      {
        bookList.map((x: BookData) => <li key={x.id}>{x.title} , {x.author}, {x.desireRating}, {x.hasObtain ? "have" : "have not"}</li>)
      }
    </ul>)
}


function AddABook() {
  return (
    <p>No Books Have been added</p>
  )
}

const colorProfile = ['indigo', 'pink', 'purple', 'gray', 'red', 'lime', 'fuchsia', 'violet', 'gray'] as const
type ContainerColor = typeof colorProfile[number];


interface ContainerProps {
  aColor?: ContainerColor
  cssClass?: string
  children: React.ReactNode
}

function generateColor() {
  return new Map(colorProfile.map((x) =>
    [x, `bg-${x}-100 border-${x}-500 text-${x}-900`]))
}


function Container({ aColor = 'gray', cssClass, children }: ContainerProps) {
  const colorContainer = generateColor()
  const styleSomething = `border-4 rounded-md text-center ${colorContainer.get(aColor)} ${cssClass ?? ""}`

  return (
    <div className={styleSomething}>
      {children}
    </div>
  )
}

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




interface ButtonProps {
  children: React.ReactNode
  handleClick: React.Dispatch<React.SetStateAction<BookData>>;

}

function Button({ handleClick, children }: ButtonProps) {
  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-30 m-2 rounded">{children}</button>

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
    if (savedBooks.some(book => book.title === newBook.title)) {
      setStatus("isStoredBook")
      return
    }

    setSavedBooks([...savedBooks, newBook])
  }


  return (
    <div className="bg-black-100 h-full p-8 flex flex-col gap-2">

      <Container aColor='indigo' cssClass="p-10">
        <h1 className="text-4xl font-bold">BOOK HUNT</h1>
        <p className="mt-4 text-lg">
          A list of books to be tracked down and bought in a second hand bookshop
        </p>

      </Container>


      {/* 49.  , , */}
      <Container aColor='purple'>
        <Button handleClick={() => updateSavedBooks({ title: "The Road", author: "Cormac McCarthy", desireRating: 2, hasObtain: false, id: "asdfg3erg" })}>Add</Button>


        {status === "isStoredBook" ? <p className="text-red-700">Book has already in List</p> : null}

      </Container>




      <Container aColor='fuchsia'>
        <div>
          <InfoTab savedBooks={savedBooks} />
        </div>
        <div className="p-10">
          {savedBooks.length !== 0 ? (<BookList bookList={savedBooks} />) : (<AddABook />)}
        </div>
      </Container>

    </div >
  )
}
