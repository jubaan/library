// const myLibrary = [{ author: 'julio', title: 'julio',  pages: 35, read: true },
// { author: 'kitzia', title: 'kitzia', pages: 29, read: true }];
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

function generateBookHTML(book) {
  const row = document.createElement('tr');
  const bookInfo = Object.values(book);

  bookInfo.forEach(property => {
    const column = document.createElement('td');
    column.textContent = property;
    row.appendChild(column);
  });

  return row;
}


function addLastBook() {
  const containerTable = document.querySelector('.library');

  lastBook = generateBookHTML(myLibrary[myLibrary.length - 1]);

  containerTable.appendChild(lastBook);

  console.log(containerTable)
}
/*
function displayLibrary() {
  const containerTable = document.querySelector('.library');

  myLibrary.forEach(book => {
    const eachBook = generateBookHTML(book);

    containerTable.appendChild(eachBook);
  });
}
*/

function createBook() {
  const form = document.forms[0];

  form.onsubmit = function(e) {
    e.preventDefault();

    const book = new Book();

    book.author = form.elements.author.value;
    book.title = form.elements.title.value;
    book.pages = +form.elements.pages.value;
    book.read = Boolean(form.elements.read.value);

    addBookToLibrary(book);
    addLastBook();
  };
}

function showForm() {
  const modalForm = document.querySelector('.modal');
  modalForm.classList.add('modal-active');
}

/*
function showForm() {
  const newFormBtn = document.querySelector('#new_book');
  const modalForm = document.querySelector('.modal');
  newFormBtn.addEventListener("onclick", () => {
    modalForm.classList.add('.modal-active');
  });
}
*/

// close form func