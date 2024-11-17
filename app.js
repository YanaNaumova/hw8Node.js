import express from "express";
import "dotenv/config";
import cors from "cors";
import sequelize from "./config/db.js";
import Book from "./models/book.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello Node.js");
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.findAll();
    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json(books);
  } catch (error) {
    console.log("Error finding books", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/books", async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const newBook = await Book.create({
      title,
      author,
      year,
    });
    if (!newBook) {
      return res.status(404).json({ message: "No created book" });
    }

    res.status(200).json(newBook);
  } catch (error) {
    console.log("Error creating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put(`/books/:id`, async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const { id } = req.params;
    const [numberOFAffectesRows] = await Book.update(
      {
        title,
        author,
        year,
      },
      { where: { id: id } }
    );
    if (numberOFAffectesRows > 0) {
      return res
        .status(200)
        .json({ message: `user with id ${id} was updated` });
    } else {
      return res
        .status(404)
        .json({ message: `user with id ${id} wasn't updated` });
    }
  } catch (error) {
    console.error(`Error updating book`, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete(`/books/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const numberOfDeletedRows = await Book.destroy({
      where: { id: id },
    });

    if (numberOfDeletedRows > 0) {
      return res
        .status(200)
        .json({ message: `book with id ${id} was deleted` });
    } else {
      return res.status(404).json({ message: `user with id ${id} not found` });
    }
  } catch (error) {
    console.error("Error deleting book", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  try {
    sequelize.authenticate();
    console.log("Connected with db was seccussfully");
    console.log(`Server running in port http://127.0.0.1:${port}`);
  } catch (error) {
    console.error("The server did not start", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
