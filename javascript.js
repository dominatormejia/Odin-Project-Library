const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }

  updateRead(value) {
    this.read = value;
  }
}

const addBookToLibrary = function (title, author, pages, read) {
  const newBook = new Book(title, author, `${pages} pages`, read);
  myLibrary.push(newBook);
};

const displayBooks = function () {
  const main = document.querySelector("main");
  main.querySelectorAll(".card").forEach((card) => {
    card.remove();
  });

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
};

const buttonHandlers = (function () {
  const form = document.querySelector("form");
  const buttonDisplay = document.querySelector(".display");

  buttonDisplay.addEventListener("click", () => {
    if (form.classList.contains("hidden")) {
      form.classList.remove("hidden");
    } else {
      form.classList.add("hidden");
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let allValid = true;

    const inputs = [
      document.querySelector("#title"),
      document.querySelector("#author"),
      document.querySelector("#page"),
    ];

    inputs.forEach((element) => {
      if (!element.validity.valid) {
        showError(element);
        allValid = false;
      } else {
        removeError(element);
      }
    });

    if (!allValid) return;

    const readInput = document.querySelector("#read");

    addBookToLibrary(
      inputs[0].value,
      inputs[1].value,
      inputs[2].value,
      readInput.value
    );

    displayBooks();

    form.reset();
    form.classList.add("hidden");
  });
})();

const templateBooks = (function () {
  addBookToLibrary("The Hobbit", "by J.R.R. Tolkien,", "295", "not read yet");
  addBookToLibrary(
    "The Way of Kings",
    "by Brandon Sanderson",
    "1,007",
    "have read"
  );
  displayBooks();
})();

const validation = (function () {
  const container = document.querySelector(".grid");

  container.addEventListener("input", (event) => {
    const input = event.target;
    if (["title", "author", "page"].includes(input.id)) {
      input.validity.valid ? removeError(input) : showError(input);
    }
  });
})();

const removeError = function (input) {
  const errorDiv = input.nextElementSibling;
  if (input.id === "title") {
    errorDiv.textContent = "";
    errorDiv.classList.remove("active");
  }
  if (input.id === "author") {
    errorDiv.textContent = "";
    errorDiv.classList.remove("active");
  }
  if (input.id === "page") {
    errorDiv.textContent = "";
    errorDiv.classList.remove("active");
  }
};

const showError = function (input) {
  const errorDiv = input.nextElementSibling;

  if (input.id === "title") {
    errorDiv.classList.add("active");
    if (input.validity.tooShort) {
      errorDiv.textContent = `Title should be at least ${input.minLength} characters; you entered ${input.value.length}.`;
    } else if (input.validity.valueMissing) {
      errorDiv.textContent = `Please enter a title`;
    }
  }
  if (input.id === "author") {
    errorDiv.classList.add("active");
    if (input.validity.tooShort) {
      errorDiv.textContent = `Author should be at least ${input.minLength} characters; you entered ${input.value.length}.`;
    } else if (input.validity.valueMissing) {
      errorDiv.textContent = `Please enter the author's name`;
    }
  }
  if (input.id === "page") {
    errorDiv.classList.add("active");
    if (input.validity.typeMismatch) {
      errorDiv.textContent = `Please enter only numbers`;
    } else if (input.validity.rangeUnderflow) {
      errorDiv.textContent = `Please enter only positive numbers`;
    } else if (input.validity.valueMissing) {
      errorDiv.textContent = `Please enter the number of pages`;
    }
  }
};
