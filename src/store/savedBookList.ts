import { createStore } from '@tanstack/react-store'
import type { BookData, BookDataCollecton } from "#/types/BookIt.ts"


interface BookDataStore {
  activeDialogWindow?: BookDataCollecton
}


// You can use instantiate a Store outside of React components too!
export const bookStore = createStore(<BookDataStore>{
  booklist: ["TEST"],

},
  ({ setState, get }) =>
  ({

    updateBookList: (newList) =>
      setState((prev) => ({
        ...prev,
        bookllist: newList
      })),

    removeBook: (bookId) => {
      console.log(bookId)
    },


  }
  )
)





