import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Faizan@123",
    database: "test"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});


app.get('/books', (req, res) => {
    const query = 'SELECT * FROM test';
    db.query(query, (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post('/books',(req,res)=>{
    const q = 'INSERT INTO test (`book_title`, `book_description`, `cover`) Values (?)'
    const Values=[req.body.book_title,req.body.book_description,req.body.cover]
    db.query(q,[Values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been Created");
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `book_id`= ?, `book_title`= ?,`book_description`= ?,`cover=?` WHERE id = ?";
  
    const values = [
      req.body.book_id,
      req.body.book_title,
      req.body.book_description,
      req.body.cover,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });



app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM test WHERE book_id = ?";

    db.query(q, [bookId], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Book has been deleted successfully" });
    });
});


process.on('SIGINT', () => {
    db.end((err) => {
        if (err) {
            console.error('Error closing database connection:', err);
            process.exit(1);
        }
        console.log('Database connection closed');
        process.exit();
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
