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
