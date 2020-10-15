"use strict";
let myLibary = [];

function Book(author = "anonymous", title, pages = 0, read = false) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

let book = new Book({author: "whatever"})
console.log(book);

function addBookToLibrary() {
  
}
