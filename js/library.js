const myLibrary = [{
  author: 'julio',
  title: 'julio',
  pages: 35,
  read: true,
},
{
  author: 'kitzia',
  title: 'kitzia',
  pages: 29,
  read: true,
}];
// const myLibrary = [];

function Book(author, title, pages = 0, read = false) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

let id = 0;


function createDeleteBtn(row) {
  const deleteButton = document.createElement('button');

  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('btn', 'red', 'lighten-3');

  row.appendChild(deleteButton);

  deleteButton.addEventListener('click', () => {
    const table = document.querySelector('.library-body');
    table.removeChild(row);
  });
}

function resetFields() {
  const form = document.forms[0];

  form.reset();
}

function generateBookHTML(book) {
  const row = document.createElement('tr');
  const bookInfo = Object.values(book);

  row.setAttribute('data-index', id += 1);
  bookInfo.forEach(property => {
    const column = document.createElement('td');

    column.textContent = property;
    row.appendChild(column);
  });

  createDeleteBtn(row);

  return row;
}

function addLastBook() {
  const containerTable = document.querySelector('.library-body');
  const lastBook = generateBookHTML(myLibrary[myLibrary.length - 1]);

  containerTable.appendChild(lastBook);
}

function hideForm() {
  const modalForm = document.querySelector('.modal');

  modalForm.classList.remove('modal-active');
}

function addBookToLibrary(book) {
  switch ('') {
    case book.title:
      hideForm();
      return;
    case book.author:
      book.author = 'Anonymous';
      break;
    default:
      break;
  }

  myLibrary.push(book);
}

function createBook(form) {
  const book = new Book();

  book.author = form.elements.author.value;
  book.title = form.elements.title.value;
  book.pages = +form.elements.pages.value;
  book.read = Boolean(+form.elements.read.value);

  return book;
}

function createAndSaveBook() { // eslint-disable-line
  const form = document.forms[0];

  form.onsubmit = (e) => {
    e.preventDefault();

    const book = createBook(form);
    addBookToLibrary(book);
    addLastBook();
    hideForm();
    resetFields();
  };
}

function listenForCreateAndSaveBook() {
  const submitBtn = document.querySelector('.btn-submit');

  submitBtn.addEventListener('click', createAndSaveBook);
}

function listenForHideForm() {
  const callingBtn = document.querySelector('.btn-cancel');
  callingBtn.addEventListener('click', hideForm);
}

function showForm() { // eslint-disable-line
  const modalForm = document.querySelector('.modal');

  modalForm.classList.add('modal-active');
  listenForHideForm();
  listenForCreateAndSaveBook();
}

function listenForShowForm() {
  const showBtn = document.querySelector('.btn-show');
  showBtn.addEventListener('click', showForm);
}

function displayLibrary() {
  const containerTable = document.querySelector('.library-body');

  myLibrary.forEach(book => {
    const eachBook = generateBookHTML(book);
    containerTable.appendChild(eachBook);
  });
}

displayLibrary();
listenForShowForm();
