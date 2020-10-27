'user strict';

const myLibraryModule = (() => {
  const myLibrary = [];
  const form = document.forms[0];
  const table = document.querySelector('.books-section');
  let dataIndex = 0;

  const bookRowTemplate = document.querySelector('#bookRowTemplate');

  const btnShowForm = document.querySelector('.btnShowForm');
  const btnHideForm = document.querySelector('.btnHideForm');

  function Book() {
    this.author = form.elements.author.value;
    this.title = form.elements.title.value;
    this.pages = +form.elements.pages.value;
    this.read = +form.elements.read.value;
  }

  const hideForm = () => {
    form.classList.remove('modal-active');
  };

  const closeForm = () => {
    btnHideForm.addEventListener('click', () => {
      hideForm();
    });
  };

  const deleteBook = (row) => {
    const btnDeleteBook = row.querySelector('.btnDeleteBook');
    const index = row.firstElementChild.getAttribute('data-index').value;

    btnDeleteBook.addEventListener('click', (row) => {
      table.deleteRow(row);
      myLibrary.splice(index, 1);
      dataIndex -= 1;
    });
  };

  // function styleNotRead(buttonIcon, icon, book) {
  //   buttonIcon.classList.add('red', 'accent-2');
  //   buttonIcon.classList.remove('green');
  //   buttonIcon.textContent = 'Not read';
  //   icon.textContent = 'cancel';
  //   book.read = false;
  // }

  // function styleRead(buttonIcon, icon, book) {
  //   buttonIcon.classList.add('green');
  //   buttonIcon.classList.remove('red', 'accent-2');
  //   buttonIcon.textContent = 'Read';
  //   icon.textContent = 'check_circle';
  //   book.read = true;
  // }

  const toggler = (row) => {
    const btnToggler = row.querySelector('.btnToggler');
    const index = row.getAttribute('data-index').value;
    const icon = row.firstElementChild.querySelector('i');

    btnToggler.addEventListener('click', () => {
      if (btnToggler.textContent === 'Not read') {
        btnToggler.classList.remove('red');
        btnToggler.classList.add('green');
        btnToggler.textContent = 'Read';
        icon.textContent = 'check_circle';
        myLibrary[index].read = true;
      } else {
        btnToggler.classList.remove('green');
        btnToggler.classList.add('red');
        btnToggler.textContent = 'Not Read';
        icon.textContent = 'cancel';
        myLibrary[index].read = false;
      }
    });
  };

  const createRow = (book) => {
    const row = bookRowTemplate.content.cloneNode(true);
    const column = row.querySelectorAll('td');

    row.firstElementChild.setAttribute('data-index', dataIndex += 1);

    column[0].textContent = book.author;
    column[1].textContent = book.title;
    column[2].textContent = book.pages;
    // toggler(row);
    deleteBook(row);

    table.appendChild(row);
  };

  const saveBook = () => {
    form.onsubmit = (e) => {
      e.preventDefault();

      const book = new Book();

      if (book.title !== '') {
        myLibrary.push(book);
        createRow(book);
      }

      hideForm();
    };
  };

  const openForm = () => {
    btnShowForm.addEventListener('click', () => {
      form.classList.add('modal-active');
      form.reset();
      saveBook();
      closeForm();
    });
  };


  return { openForm, myLibrary };
})();

myLibraryModule.openForm();

// myLibraryModule.renderBook(book);

// const myLibrary = [];

// function Book(author, title, pages = 0, read = false) {
//   this.author = author;
//   this.title = title;
//   this.pages = pages;
//   this.read = read;
// }

// function notReadStyling(buttonIcon, icon, book) {
//   buttonIcon.classList.add('red', 'accent-2');
//   buttonIcon.classList.remove('green');
//   buttonIcon.textContent = 'Not read';
//   icon.textContent = 'cancel';
//   book.read = false;
// }

// function readStyling(buttonIcon, icon, book) {
//   buttonIcon.classList.add('green');
//   buttonIcon.classList.remove('red', 'accent-2');
//   buttonIcon.textContent = 'Read';
//   icon.textContent = 'check_circle';
//   book.read = true;
/// }

// function toggler(buttonIcon, icon, book, readColumn) {
//   buttonIcon.addEventListener('click', () => {
//     if (book.read) {
//       notReadStyling(buttonIcon, icon, book);
//     } else {
//       readStyling(buttonIcon, icon, book);
//     }
//     buttonIcon.appendChild(icon);
//     readColumn.appendChild(buttonIcon);
//   });
// }

// function iconize(readColumn, book) {
//   const buttonIcon = document.createElement('a');
//   const icon = document.createElement('i');

//   icon.classList.add('material-icons', 'right');

//   if (book.read) {
//     readStyling(buttonIcon, icon, book);
//   } else {
//     notReadStyling(buttonIcon, icon, book);
//   }

//   buttonIcon.appendChild(icon);
//   readColumn.appendChild(buttonIcon);

//   toggler(buttonIcon, icon, book, readColumn);
// }

// function createDeleteBtn(row) {
//   const deleteButton = document.createElement('a');
//   const column = document.createElement('td');
//   deleteButton.textContent = 'Delete';
//   deleteButton.classList.add('btn', 'red', 'lighten-3', 'waves-effect', 'waves-light');

//   column.appendChild(deleteButton);
//   row.appendChild(column);

//   deleteButton.addEventListener('click', () => {
//     const table = document.querySelector('.library-body');
//     table.removeChild(row);
//   });
// }

// function resetFields() {
//   const form = document.forms[0];

//   form.reset();
// }

// function generateBookHTML(book) {
//   const row = document.createElement('tr');

//   const {
//     author, title, pages, read,
//   } = book;

//   const bookInfo = [author, title, pages, read];

//   bookInfo.forEach(property => {
//     const column = document.createElement('td');

//     if (property !== true && property !== false) {
//       column.textContent = property;
//     }
//     row.appendChild(column);
//   });

//   const readColumn = row.querySelector(':nth-child(4)');

//   iconize(readColumn, book);
//   createDeleteBtn(row);

//   return row;
// }

// function addLastBook() {
//   const containerTable = document.querySelector('.library-body');
//   const lastBook = generateBookHTML(myLibrary[myLibrary.length - 1]);

//   containerTable.appendChild(lastBook);
// }

// function hideForm() {
//   const modalForm = document.querySelector('.modal');

//   modalForm.classList.remove('modal-active');
// }

// function addBookToLibrary(book) {
//   switch ('') {
//     case book.title:
//       hideForm();
//       return;
//     case book.author:
//       book.author = 'Anonymous';
//       break;
//     default:
//       break;
//   }

//   myLibrary.push(book);
// }

// function createBook(form) {
//   const book = new Book();

//   book.author = form.elements.author.value;
//   book.title = form.elements.title.value;
//   book.pages = +form.elements.pages.value;
//   book.read = Boolean(+form.elements.read.value);

//   return book;
// }

// function createAndSaveBook() { // eslint-disable-line
//   const form = document.forms[0];

//   form.onsubmit = (e) => {
//     e.preventDefault();

//     const book = createBook(form);
//     if (book.title !== '') {
//       addBookToLibrary(book);
//       addLastBook();
//     }
//     hideForm();
//     resetFields();
//   };
// }

// const saveBook = () => {
//   form.onsubmit = (e) => {
//     e.preventDefault();
    
//     if (book.title !== '') {
//       myLibrary.push(createBook());
//       addLastBook();
//   const containerTable = document.querySelector('.library-body');
//   const lastBook = generateBookHTML(myLibrary[myLibrary.length - 1]);

//   containerTable.appendChild(lastBook);
//   }
// };

// function listenForCreateAndSaveBook() {
//   const submitBtn = document.querySelector('.btn-submit');

//   submitBtn.addEventListener('click', createAndSaveBook);
// }

// function listenForHideForm() {
//   const callingBtn = document.querySelector('.btn-cancel');
//   callingBtn.addEventListener('click', hideForm);
// }


// function render() {
//   const containerTable = document.querySelector('.library-body');

//   myLibrary.forEach(book => {
//     const eachBook = generateBookHTML(book);
//     containerTable.appendChild(eachBook);
//   });
// }

// render();
// listenForShowForm();
