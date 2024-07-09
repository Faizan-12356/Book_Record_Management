import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';    

const Book = () => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState({
        term: '',
        results: []
    });
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/books');
                setBooks(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllBooks();
    }, []);

    useEffect(() => {
        const results = books.filter(book =>
            book.book_title.toLowerCase().includes(search.term.toLowerCase())
        );
        setSearch(prevState => ({
            ...prevState,
            results: results
        }));
    }, [search.term, books]);

    const handleDelete = async (book_id) => {
        try {
            await axios.delete(`http://localhost:8080/books/${book_id}`);
            setBooks(books.filter(book => book.book_id !== book_id));
        } catch (err) {
            console.log(err);
        }
    }

    const handleSearch = (e) => {
        setSearch(prevState => ({
            ...prevState,
            term: e.target.value
        }));
    }

    return (
        <>
            <h1>Faizan Book Shop</h1>
            <div className="search-bar">
                <input type="text" placeholder="Search by title" value={search.term} onChange={handleSearch} />
                <button>Search</button>
            </div>
            <table className="books">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Cover</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {search.results.map(book => (
                        <tr key={book.book_id}>
                            <td>{book.book_title}</td>
                            <td>{book.book_description}</td>
                            <td>{book.cover && <img src={book.cover} alt="" />}</td>
                            <td>
                                <button className='delete' onClick={() => handleDelete(book.book_id)}>Delete</button>
                                <Link to={`/update/${book.book_id}`}><button className='update'>Update</button></Link>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/add">
                <button>Add Book</button>
            </Link>
        </>
    );
};

export default Book;