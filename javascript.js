const main = document.querySelector("main");
const buttonDisplay = document.querySelector(".display");
const form = document.querySelector("form");
const submit = document.querySelector(".submit");
const select = document.querySelector("#read");
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

Book.prototype.updateRead = function (value) {
  this.read = value;
};

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
    const deleteCard = document.createElement("button");

    newTitle.textContent = myLibrary[i].title;
    newAuthor.textContent = myLibrary[i].author;
    newPage.textContent = myLibrary[i].pages;
    yesOption.textContent = "Read";
    noOption.textContent = "Not Read";
    deleteCard.textContent = "Delete Book";

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
    newDiv.appendChild(deleteCard);

    newDiv.classList.add("card");

    deleteCard.addEventListener("click", () => {
      myLibrary.splice(i, 1);

      main.removeChild(newDiv);
    });

    newRead.addEventListener("change", (e) => {
      myLibrary[i].updateRead(e.target.value);
    });
  }
}

buttonDisplay.addEventListener("click", () => {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
  } else {
    form.classList.add("hidden");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titleInput = document.querySelector("#title");
  const authorInput = document.querySelector("#author");
  const pagesInput = document.querySelector("#page");
  const readInput = document.querySelector("#read");

  addBookToLibrary(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readInput.value
  );

  main.querySelectorAll(".card").forEach((card) => {
    card.remove();
  });

  displayBooks();

  form.reset();
  form.classList.add("hidden");
});

addBookToLibrary(
  "The Hobbit",
  "by J.R.R. Tolkien,",
  "295 pages",
  "not read yet"
);
addBookToLibrary(
  "The Way of Kings",
  "by Brandon Sanderson",
  "1,007 pages",
  "have read"
);

displayBooks(myLibrary);

console.log(myLibrary);
