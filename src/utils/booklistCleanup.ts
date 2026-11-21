import fs from 'fs'
import { randomUUID } from 'node:crypto';

import csv from 'csv-parser'
import { createObjectCsvWriter } from "csv-writer";

import type { BookData } from '#/types/BookIt';


export function parseBookList(bookCSV) {
  return new Promise((resolve, reject) => {
    const books: BookData[] = [];

    fs.createReadStream(bookCSV)
      .pipe(csv())
      .on('data', (row) => {
        books.push(cleanData(row));
      })
      .on('end', () => resolve(books))
      .on('error', reject);
  });
}



function cleanData(row: BookData) {

  const bookListing = {
    id: row.id,
    title: row.title.trim(),
    author: row.author.trim(),
    hasObtain: row.hasObtain === 'true',
    desireRating: Number(row.desireRating)
  }

  return bookListing

}


// Function to change up the csv to fit better 
//
async function saveNewCSV() {
  const BOOK_FILE = '../data/BookItDataBase.csv'

  function muddleData(row: BookData) {
    const [number, title] = row.title.split(".")
    const hasObtain = row.hasObtain ? true : false

    const bookListing = {
      id: randomUUID(),
      title: title.trim(),
      author: row.author.trim(),
      hasObtain,
      desireRating: 0
    }
    return bookListing

  }


  const cleanUp = await parseBookList(BOOK_FILE)


  const csvWriter = createObjectCsvWriter({
    path: "../data/BookItDataBase.csv",
    header: [
      { id: "id", title: "id" },
      { id: "title", title: "title" },
      { id: "author", title: "author" },
      { id: "desireRating", title: "desireRating" },
      { id: "hasObtain", title: "hasObtain" },
    ],
  });



  // await csvWriter.writeRecords(cleanUp);



}


