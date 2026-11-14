// src/serverActions/jokesActions.ts
import { createServerFn } from '@tanstack/react-start'
import * as fs from 'node:fs'

import type { BookData, BookDataCollecton } from '#/types/BookIt'
import { parseBookList } from '#/utils/csvActions'
const BOOK_FILE = 'src/data/BookItDataBase.csv'

export const getBooks = createServerFn({ method: "GET" }).handler(async () => {
  const bookCollection = await parseBookList(BOOK_FILE)
  return bookCollection as BookDataCollecton

})



