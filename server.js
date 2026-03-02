import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

// "DB" 
let books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
  { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt", year: 1999 },
  { id: 3, title: "Eloquent JavaScript", author: "Marijn Haverbeke", year: 2018 }
];

// route test
app.get("/", (req, res) => {
  res.send("Book API running");
});

// GET all
app.get("/books", (req, res) => {
  res.json(books);
});

// GET by id
app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((b) => b.id === id);

  if (!book) return res.status(404).json({ message: "Book not found" });

  res.json(book);
});

// post

app.post("/books", (req, res) => {
    const {title, author, year} = req.body;
    if(!title || !author || !year){
        return res.status(400).json({
            message: "Missin required fields: title, author, year"
        });
    }
    const newId = books.length > 0? books[books.length - 1].id + 1 : 1;

    const newBook = {id: newId, title, author, year};
    books.push(newBook);

    res.status(201).json({
        message: "Book created successfully",
        book: newBook
    });
});

app.put("/books/:id", (req, res)=> {
    const id = Number(req.params.id);
    const book = books.find((b)=> b.id === id);
    if(!book) return res.status(404).json({
        message: "Book not found"
    });

    const { title, author, year} = req.body;

    if(title !== undefined) book.title = title;
    if(author !== undefined) book.author  = author ;
    if(year === undefined) book.year = year;

    res.json({
        menssage: "Book updated successfully",
        book
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});
