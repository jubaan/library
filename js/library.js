const documentMock = (() => ({
  querySelector: (selector) => ({
    innerHTML: null,
  }),
}))();

const libraryModule = ((doc) => {
  const myLibrary = [];

  function Book(author, title, pages = 0, read = false) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }

  function resetFields() {
    const form = doc.forms[0];

    form.reset();
  }

  function createDeleteBtn(row) {
    const deleteButton = doc.createElement('a');
    const column = doc.createElement('td');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn', 'red', 'lighten-3', 'waves-effect', 'waves-light');

    column.appendChild(deleteButton);
    row.appendChild(column);

    deleteButton.addEventListener('click', () => {
      const table = doc.querySelector('.library-body');
      table.removeChild(row);
    });
  }

  function notReadStyling(buttonIcon, icon, book) {
    buttonIcon.classList.add('waves-effect', 'waves-light', 'red', 'accent-2', 'btn');
    buttonIcon.classList.remove('green');
    buttonIcon.textContent = 'Not read';
    icon.textContent = 'cancel';
    book.read = false;
  }

  function readStyling(buttonIcon, icon, book) {
    buttonIcon.classList.add('waves-effect', 'waves-light', 'green', 'btn');
    buttonIcon.classList.remove('red', 'accent-2');
    buttonIcon.textContent = 'Read';
    icon.textContent = 'check_circle';
    book.read = true;
  }

  function toggler(buttonIcon, icon, book, readColumn) {
    buttonIcon.addEventListener('click', () => {
      if (book.read) {
        notReadStyling(buttonIcon, icon, book);
      } else {
        readStyling(buttonIcon, icon, book);
      }
      buttonIcon.appendChild(icon);
      readColumn.appendChild(buttonIcon);
    });
  }

  function iconize(readColumn, book) {
    const buttonIcon = doc.createElement('a');
    const icon = doc.createElement('i');

    icon.classList.add('material-icons', 'right');

    if (book.read) {
      readStyling(buttonIcon, icon, book);
    } else {
      notReadStyling(buttonIcon, icon, book);
    }

    buttonIcon.appendChild(icon);
    readColumn.appendChild(buttonIcon);

    toggler(buttonIcon, icon, book, readColumn);
  }

  function generateBookHTML(book) {
    const row = doc.createElement('tr');

    const {
      author, title, pages, read,
    } = book;

    const bookInfo = [author, title, pages, read];

    bookInfo.forEach(property => {
      const column = doc.createElement('td');

      if (property !== true && property !== false) {
        column.textContent = property;
      }
      row.appendChild(column);
    });

    const readColumn = row.querySelector(':nth-child(4)');

    iconize(readColumn, book);
    createDeleteBtn(row);

    return row;
  }

  function addLastBook() {
    const containerTable = doc.querySelector('.library-body');
    const lastBook = generateBookHTML(myLibrary[myLibrary.length - 1]);

    containerTable.appendChild(lastBook);
  }

  function hideForm() {
    const modalForm = doc.querySelector('.modal');

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

  function createAndSaveBook() {
    const form = doc.forms[0];

    form.onsubmit = (e) => {
      e.preventDefault();

      const book = createBook(form);
      if (book.title !== '') {
        addBookToLibrary(book);
        addLastBook();
      }
      hideForm();
      resetFields();
    };
  }

  function listenForCreateAndSaveBook() {
    const submitBtn = doc.querySelector('.btn-submit');

    submitBtn.addEventListener('click', createAndSaveBook);
  }

  function listenForHideForm() {
    const callingBtn = doc.querySelector('.btn-cancel');
    callingBtn.addEventListener('click', hideForm);
  }

  function showForm() {
    const modalForm = doc.querySelector('.modal');

    modalForm.classList.add('modal-active');
    listenForHideForm();
    listenForCreateAndSaveBook();
  }

  function listenForShowForm() {
    const showBtn = doc.querySelector('.btn-show');
    showBtn.addEventListener('click', showForm);
  }

  function displayLibrary() {
    const containerTable = doc.querySelector('.library-body');

    myLibrary.forEach(book => {
      const eachBook = generateBookHTML(book);
      containerTable.appendChild(eachBook);
    });
  }

  return {
    displayLibrary,
    listenForShowForm,
  };
})(document || documentMock);

libraryModule.displayLibrary();

libraryModule.listenForShowForm();