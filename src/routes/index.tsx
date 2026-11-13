import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })



interface BookDataProps {
  title: string
  author: string
  desireRating: number
  hasObtain: boolean
}
interface BookListProps {
  bookList: BookDataProps[]
}



function BookList({ bookList }: BookListProps) {
  return (
    <ul>
      {
        bookList.map((x: BookDataProps) => <li>{x.title} , {x.author}, {x.desireRating}, {x.hasObtain ? "have" : "have not"}</li>)
      }
    </ul>)
}


function AddABook() {
  return (
    <p>No Books Have been added</p>
  )
}

interface ContainerProps {
  children: React.ReactNode
}

function Container({ children }: ContainerProps) {
  return (
    <div className=' p-20 border-4 border-fuchsia-500 rounded-xl bg-fuchsia-100 text-fuchsia-900 text-center'>
      {children}
    </div>
  )
}



function Home() {

  const savedBooks = [{ title: "The Great Gatsby", author: "F. Scott Fitzgerald", desireRating: 0, hasObtain: false }]

  return (
    <div className="bg-zinc-700 h-full p-8 flex flex-col gap-10">
      <div className='border-4 border-purple-500 rounded-xl p-20 bg-purple-200 text-purple-900 text-center'>

        <h1 className="text-4xl font-bold">BOOK HUNT</h1>
        <p className="mt-4 text-lg">
          A list of books to be tracked down and bought in a second hand bookshop
        </p>
      </div>
      <Container>
        {savedBooks.length !== 0 ? (<BookList bookList={savedBooks} />) : (<AddABook />)}
      </Container>
    </div>
  )
}
