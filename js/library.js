'use strict';

let myLibrary = [];

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
  let pages = prompt('How many pages does it have?', '');
  let read = confirm('Have you read this book? if you have click "OK" if not "Cancel"');

  let book = new Book(author, title, pages, read);

  addBookToLibrary(book);
}



// function getBook() {
//   let current_book = {};
// }

// function displayBook() {
  // will take current book
  // generate a tr and attach it to table as last child
  // generate a td for each property value (loop for .. in ..)
// }

// function displayLibrary() {
  // checkBooks();
// }
