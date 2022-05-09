// making all hash Tags into red color
let star = document.querySelectorAll('span');
star.forEach((item) => {
  item.style.color = 'red';
});
// -----------------------------------------------------------------

// Get UI Elements
let form = document.getElementById('book-form');
let bookList = document.querySelector('#book-list');
// -----------------------------------------------------------------

// Book Class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
// -----------------------------------------------------------------

class bookUI {
  // constructor() {}
  static addToBookList(para) {
    let bookInfo = para;

    let bookList = document.getElementById('book-list');
    let row = document.createElement('tr');
    row.innerHTML = `
    <td>${bookInfo.title}</td>
    <td>${bookInfo.author}</td>
    <td>${bookInfo.isbn}</td>
    <td><a href="#" class="delete button">X</a></td>
    `;

    bookList.appendChild(row);
    // console.log(row);
  }

  static clearInputs() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  static showErrorAlert(message, className) {
    let div = document.createElement('div');
    div.className = `errorDiv ${className}`;
    div.appendChild(document.createTextNode(message));

    let container = document.querySelector('.container');
    let form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector('.errorDiv').remove();
    }, 3000);
  }

  static showTitleErrorAlert(message, className) {
    let div = document.createElement('div');
    div.className = `tDiv ${className}`;
    div.innerText = message;

    let form = document.querySelector('#book-form');
    let titleDiv = document.getElementById('title-div');

    form.insertBefore(div, titleDiv);

    let t = document.getElementById('title');
    t.setAttribute('value', 'Fill this field*');
    t.style.color = 'red';

    setTimeout(() => {
      t.removeAttribute('value');
      // t.setAttribute('value', '');
      t.style.color = 'black';

      document.querySelector('.tDiv').remove();
    }, 3000);
  }

  static showAuthorErrorAlert(message, className) {
    let div = document.createElement('div');
    div.className = `aDiv ${className}`;
    div.innerText = message;

    let form = document.querySelector('#book-form');
    let authorDiv = document.getElementById('author-div');

    form.insertBefore(div, authorDiv);

    let a = document.getElementById('author');
    a.setAttribute('value', 'Fillup this field*');
    a.style.color = 'red';

    setTimeout(() => {
      a.removeAttribute('value');
      // a.setAttribute('value', '');
      a.style.color = 'black';

      document.querySelector('.aDiv').remove();
    }, 3000);
  }

  static showISBNErrorAlert(message, className) {
    let div = document.createElement('div');
    div.className = `iDiv ${className}`;
    div.innerText = message;

    let form = document.querySelector('#book-form');
    let isbnDiv = document.getElementById('isbn-div');

    form.insertBefore(div, isbnDiv);

    let i = document.getElementById('isbn');
    i.setAttribute('type', 'text');
    i.setAttribute('value', 'Fillup this field*');
    i.style.color = 'red';

    setTimeout(() => {
      i.removeAttribute('value');
      // i.setAttribute('value', '');

      i.setAttribute('type', 'number');
      i.style.color = 'black';

      document.querySelector('.iDiv').remove();
    }, 3000);
  }

  static showSuccessAlert(message, className) {
    let div = document.createElement('div');
    div.className = `successDiv ${className}`;
    div.innerText = `${message}`;

    let container = document.querySelector('.container');
    let form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector('.successDiv').remove();
    }, 3000);
  }

  static deleteFromBookList(target) {
    if (target.hasAttribute('href')) {
      // console.log(target.parentElement.parentElement)
      target.parentElement.parentElement.remove();

      let isbn = target.parentElement.previousElementSibling.textContent.trim();
      StoreInLocalStorage.removeBookFromLocalStorage(isbn);

      bookUI.showBookDeleteAlert('Deleted!', 'error');
    }
  }

  static showBookDeleteAlert(message, className) {
    let div = document.createElement('div');
    div.className = `bookDelete ${className}`;
    div.innerText = message;

    let container = document.querySelector('.container');
    let table = document.querySelector('table');

    container.insertBefore(div, table);

    setTimeout(() => {
      document.querySelector('.bookDelete').remove();
    }, 2000);
  }
}
// -----------------------------------------------------------------

// Local storage Class
class StoreInLocalStorage {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    let books = StoreInLocalStorage.getBooks();
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static displayBooks() {
    let books = StoreInLocalStorage.getBooks();

    books.forEach((item) => {
      bookUI.addToBookList(item);
    });
  }

  static removeBookFromLocalStorage(isbn) {
    let books = StoreInLocalStorage.getBooks();
    books.forEach((item, index) => {
      if (item.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}
// -----------------------------------------------------------------

// Add Event Listner
form.addEventListener('submit', newBookList);
bookList.addEventListener('click', removeBoolList);
document.addEventListener(
  'DOMContentLoaded',
  StoreInLocalStorage.displayBooks()
);
// -----------------------------------------------------------------

// Define Function
function newBookList(e) {
  e.preventDefault();

  let title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  let book = new Book(title, author, isbn);

  if (title === '' && author === '' && isbn === '') {
    bookUI.showErrorAlert('Please fill all the fields', 'error');
  } else if (title === '' && author === '') {
    bookUI.showTitleErrorAlert('Title field is empty', 'error');
    bookUI.showAuthorErrorAlert('Author field is empty', 'error');
  } else if (author === '' && isbn === '') {
    bookUI.showAuthorErrorAlert('Author field is empty', 'error');
    bookUI.showISBNErrorAlert('ISBN field is empty', 'error');
  } else if (isbn === '' && title === '') {
    bookUI.showISBNErrorAlert('ISBN field is empty', 'error');
    bookUI.showTitleErrorAlert('Title field is empty', 'error');
  } else if (title === '') {
    bookUI.showTitleErrorAlert('Title field is empty', 'error');
  } else if (author === '') {
    bookUI.showAuthorErrorAlert('Author field is empty', 'error');
  } else if (isbn === '') {
    bookUI.showISBNErrorAlert('ISBN field is empty', 'error');
  } else {
    bookUI.addToBookList(book);
    bookUI.showSuccessAlert('Successfully Added!', 'success');
    bookUI.clearInputs();

    StoreInLocalStorage.addBook(book);
  }
}
// -----------------------------------------------------------------

function removeBoolList(e) {
  e.preventDefault();
  bookUI.deleteFromBookList(e.target);
}
