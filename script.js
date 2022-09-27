let myLibrary = [];

const newBtn = document.querySelector('.new');
const addBtn = document.querySelector('.add');
const form = document.querySelector('form');

function Book (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

newBtn.addEventListener('click', () => {
  newBtn.style.display = 'none';
  form.style.display = 'flex';
});

addBtn.addEventListener('click', () => {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');
  const read = document.querySelector('#read');

  addBookToLibrary(title.value, author.value, pages.value, read.checked);
  displayLibrary();

  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;

  newBtn.style.display = 'block';
  form.style.display = 'none';
});

function addBookToLibrary (title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function displayLibrary() {
  const container = document.querySelector('.container');
  container.innerHTML = '';

  if (myLibrary.length === 0) {
    container.textContent = 'No books added...';
    return;
  }

  for (let i = 0; i < myLibrary.length; i++) {
    let rmBtns = [];
    const element = document.createElement('div');
    element.classList.add('book');

    element.innerHTML = `
      <h1>${myLibrary[i].title}</h1>
      <p>Author: <b>${myLibrary[i].author}</b></p>
      <p>Pages: ${myLibrary[i].pages}</p>
      <p>${myLibrary[i].read ? "You've read it already" : "You've not read it yet"}</p>
      <button class="read">Mark as ${myLibrary[i].read ? "not " : ""}read</button>
      <button class="remove">Remove</button>
    `;

    element.querySelector('.read').addEventListener('click', (e) => {
      myLibrary[i].read = !myLibrary[i].read;
      displayLibrary();
    });

    element.querySelector('.remove').addEventListener('click', () => {
      myLibrary.splice(i, 1);
      displayLibrary();
    });

    container.appendChild(element);
  }
}

displayLibrary();
