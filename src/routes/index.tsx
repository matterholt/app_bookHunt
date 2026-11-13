import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })



interface BookDataProps {
  id: string
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
        bookList.map((x: BookDataProps) => <li key={x.id}>{x.title} , {x.author}, {x.desireRating}, {x.hasObtain ? "have" : "have not"}</li>)
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
  savedBooks: BookDataProps[]
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


  const savedBooks = [
    { title: "Lonesome Dove", author: "Larry McMurtry", desireRating: 5, hasObtain: false, id: "qewr" },
    { title: "The Call of the Wild", author: "Jack London", desireRating: 4, hasObtain: true, id: "asdf" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", desireRating: 0, hasObtain: false, id: "okn" }]

  return (
    <div className="bg-black-100 h-full p-8 flex flex-col gap-2">

      <Container aColor='indigo' cssClass="p-20">
        <h1 className="text-4xl font-bold">BOOK HUNT</h1>
        <p className="mt-4 text-lg">
          A list of books to be tracked down and bought in a second hand bookshop
        </p>

      </Container>


      <Container aColor='purple'>
        some action for it
      </Container>




      <Container aColor='fuchsia'>
        <div>

          <InfoTab savedBooks={savedBooks} />
        </div>
        <div className="p-20">
          {savedBooks.length !== 0 ? (<BookList bookList={savedBooks} />) : (<AddABook />)}
        </div>
      </Container>

    </div >
  )
}
