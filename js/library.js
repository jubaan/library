'use strict';

const myLibrary = [];

function Book(author = 'anonymous', title, pages = 0, read = false) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  return myLibrary;
}

function askUserForBookInfo() {
  let title = prompt("What's the book title?", '');
  let author = prompt("Who's the book's author?", '');
  let pages = +prompt('How many pages does it have?', '');
  let read = confirm('Have you read this book? if you have click "OK" if not "Cancel"');

  let book = new Book(author, title, pages, read);

  addBookToLibrary(book);
}

let testFirst = new Book("anon", "new book", 49, true);

let testSecond = new Book ("newauthor", "second", 6789, false);

addBookToLibrary(testFirst);
addBookToLibrary(testSecond);


// function getBook() {
//   let current_book = {};
// }

function generateBookHTML(book) {
  // will take current book
  // generate a tr and 
  let row = document.createElement('tr');
  // generate a td for each property value (loop for .. in ..)
  for (let prop in book){
    let column = document.createElement('td');
    column.textContent = book[prop];
    row.appendChild(column);
    }
  return row
  // attach it to table as last child
}

function displayLibrary() {
  let containerTable = document.querySelector('.library');
  let eachBook = myLibrary.forEach (book => {
    generateBookHTML(book)
    containerTable.appendChild(eachBook)
  });
  
}
