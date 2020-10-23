const documentMock = (() => ({
  querySelector: (selector) => ({ // eslint-disable-line
    innerHTML: null,
  }),
}))();

const libraryModule = ((doc) => {
  const myLibrary = [];
  const containerTable = doc.querySelector('.library-body');
  const modalForm = doc.querySelector('.modal');
  const submitBtn = doc.querySelector('.btn-submit');
  const callingBtn = doc.querySelector('.btn-cancel');
  const showBtn = doc.querySelector('.btn-show');


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
      containerTable.removeChild(row);
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
    const lastBook = generateBookHTML(myLibrary[myLibrary.length - 1]);

    containerTable.appendChild(lastBook);
  }

  function hideForm() {
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
    submitBtn.addEventListener('click', createAndSaveBook);
  }

  function listenForHideForm() {
    callingBtn.addEventListener('click', hideForm);
  }

  function showForm() {
    modalForm.classList.add('modal-active');
    listenForHideForm();
    listenForCreateAndSaveBook();
  }

  function listenForShowForm() {
    showBtn.addEventListener('click', showForm);
  }

  function displayLibrary() {
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