const main = document.querySelector("main");
const buttonDisplay = document.querySelector(".display");
const form = document.querySelector("form");

const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}
function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    const newDiv = document.createElement("div");
    const newTitle = document.createElement("h2");
    const newAuthor = document.createElement("h3");
    const newPage = document.createElement("h4");
    const newRead = document.createElement("select");
    const yesOption = document.createElement("option");
    const noOption = document.createElement("option");

    newTitle.textContent = myLibrary[i].title;
    newAuthor.textContent = myLibrary[i].author;
    newPage.textContent = myLibrary[i].pages + " " + myLibrary[i].read;
    yesOption.textContent = "Read";
    noOption.textContent = "Not Read";

    if (myLibrary[i].read === "have read") {
      yesOption.selected = true;
    } else {
      noOption.selected = true;
    }

    main.appendChild(newDiv);
    newDiv.appendChild(newTitle);
    newDiv.appendChild(newAuthor);
    newDiv.appendChild(newPage);
    newDiv.appendChild(newRead);
    newRead.appendChild(yesOption);
    newRead.appendChild(noOption);

    newDiv.classList.add("card");
  }
}

addBookToLibrary(
  "The Hobbit",
  "by J.R.R. Tolkien,",
  "295 pages,",
  "not read yet"
);
addBookToLibrary(
  "The Way of Kings",
  "by Brandon Sanderson",
  "1,007 pages,",
  "have read"
);

displayBooks(myLibrary);
// console.log(myLibrary);

buttonDisplay.addEventListener("click", () => {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
  } else {
    form.classList.add("hidden");
  }
});
