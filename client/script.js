const createBook = document.querySelector(".create");
const updateBook = document.querySelector(".update");
const deleteBook = document.querySelector(".delete");
const url = "http://127.0.0.1:3333";

createBook.addEventListener("click", async () => {
  try {
    const response = await fetch(url + "/books", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        title: "My book",
        author: "Author",
        year: 2025,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

updateBook.addEventListener("click", async () => {
  try {
    const bookId = 1;
    const booksUrl = url + "/books/" + bookId;
    const response = await fetch(booksUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "My book6",
        author: "Author6",
        year: 2030,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

deleteBook.addEventListener("click", async () => {
  try {
    const bookId = 1;
    const bookUrl = url + "/books/" + bookId;
    const response = await fetch(bookUrl, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
});
