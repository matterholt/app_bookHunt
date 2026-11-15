// src/serverActions/jokesActions.ts
import { createServerFn } from '@tanstack/react-start'
import { saveBookListToCSV } from "#/utils/csvActions"

import { randomUUID } from 'node:crypto';

import type { BookData, BookDataCollecton } from '#/types/BookIt'
import { parseBookList } from '#/utils/csvActions'


export const getBooks = createServerFn({ method: "GET" }).handler(async () => {
  const bookCollection = await parseBookList()
  return bookCollection as BookDataCollecton

})


export const addBook = createServerFn({ method: "POST" })
  .validator((data: { title: string, author: string, hasObtain: boolean, desiredRating: number }) => {
    if (!data.title || !data.title.trim()) {
      throw new Error("Book title is required")
    }
    if (!data.author || !data.author.trim()) {
      throw new Error("Book author is required")
    }
    return data
  }).handler(async ({ data }) => {

    try {
      const storedBooks = await getBooks()


      if (storedBooks.some(book => book.title === data.title)) {
        console.log("title has been in the stored books")
        return
      }


      const newBookOnList: BookData = {
        id: randomUUID(),
        title: data.title,
        author: data.author,
        hasObtain: data.hasObtain,
        desireRating: data.desiredRating
      }
      console.log("GEETT", newBookOnList)
      const updatedBooks = [...storedBooks, newBookOnList]


      await saveBookListToCSV(updatedBooks)

      return newBookOnList


    } catch (error) {
      console.error('Failed to add Book:', error)
      throw new Error('Failed to add Book')
    }

  })




