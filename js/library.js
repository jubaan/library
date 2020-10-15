const myLibrary = [{ author: 'julio', title: 'julio',  pages: 35, read: true }, { author: 'kitzia', title: 'kitzia', pages: 29, read: true }
];

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
  const title = prompt("What's the book title?", '');
  const author = prompt("Who's the book's author?", '');
  const pages = +prompt('How many pages does it have?', '');
  const read = confirm('Have you read this book? if you have click "OK" if not "Cancel"'); // eslint-disable-line 

  const book = new Book(author, title, pages, read);

  addBookToLibrary(book);
}

function generateBookHTML(book) {
  const row = document.createElement('tr');

  for (const property in book) {
    const isOwn = property in book;

    if (isOwn) {
      const column = document.createElement('td');

      column.textContent = book[property];
      row.appendChild(column);
    }
  }

  return row;
}

function displayLibrary() {
  const containerTable = document.querySelector('.library');

  myLibrary.forEach(book => {
    const eachBook = generateBookHTML(book);

    containerTable.appendChild(eachBook);
  });
}
