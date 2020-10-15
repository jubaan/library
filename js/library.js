"use strict";
let myLibary = [];

function Book(author = "anonymous", title, pages = 0, read = false) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  return myLibrary;
}

function checkBooks() {
  current_book = {}
  myLibrary.forEach (book => book);
}

function displayBook() {
  //will take current book
  //generate a tr and attach it to table as last child
  //generate a td for each property value (loop for .. in ..)

}

function displayLibrary() {
  checkBooks();
}

