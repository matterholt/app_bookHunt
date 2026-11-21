import fs from 'fs'
import csv from 'csv-parser'
import { randomUUID } from 'node:crypto';

import { createObjectCsvWriter } from "csv-writer";

import type { BookData } from '#/types/BookIt';
import { resolve } from 'node:dns';


const SAVED_BOOK_CSV = "src/data/BookItDataBase.csv"



export async function saveBookListToCSV(savedBooks) {

  const csvBookStructure = createObjectCsvWriter({
    path: SAVED_BOOK_CSV,
    header: [
      { id: "id", title: "id" },
      { id: "title", title: "title" },
      { id: "author", title: "author" },
      { id: "desireRating", title: "desireRating" },
      { id: "hasObtain", title: "hasObtain" },
    ],
  });

  await csvBookStructure.writeRecords(savedBooks);

}

function cleanData(row: BookData) {

  const bookListing = {
    id: row.id,
    title: row.title.trim(),
    author: row.author.trim(),
    hasObtain: row.hasObtain === 'true', // need to fix, but OK
    desireRating: Number(row.desireRating)
  }

  return bookListing

}


export function parseBookList() {
  return new Promise((resolve, reject) => {
    // wonder if should have this data
    const books: BookData[] = [];

    fs.createReadStream(SAVED_BOOK_CSV)
      .pipe(csv())
      .on('data', (row) => {
        books.push(cleanData(row));
      })
      .on('end', () => resolve(books))
      .on('error', reject);
  });


}


