import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Alert, Spinner, Navbar } from "react-bootstrap";
import { FaPlus, FaBook } from "react-icons/fa";

import { getBooks, addBook, updateBook, deleteBook } from "./service/bookApi";
import BookCard from "./components/BookCard";
import BookFormModal from "./components/BookFormModal";

function App() {
  const [books, setBooks] = useState([]);            // list of all books
  const [loading, setLoading] = useState(true);      // show spinner while fetching
  const [message, setMessage] = useState(null);      // { type: "success", text: "..." }
  const [showForm, setShowForm] = useState(false);   // is the modal open?
  const [selectedBook, setSelectedBook] = useState(null); // null = adding, book = editing

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response.data); // axios puts the server data in response.data
    } catch (error) {
      showMessage("danger", "Could not load books. Is JSON Server running?");
    } finally {
      setLoading(false); // runs whether it succeeded or failed
    }
  };

  // Show a message, then hide it automatically after 3 seconds
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  
  const handleAddClick = () => {
    setSelectedBook(null); // no book selected → "Add" mode
    setShowForm(true);
  };

  const handleEditClick = (book) => {
    setSelectedBook(book); // remember which book → "Edit" mode
    setShowForm(true);
  };

  
  const handleSave = async (bookData) => {
    try {
      if (selectedBook) {
        // Editing: send PUT, then replace that book in our list
        const response = await updateBook(selectedBook.id, bookData);
        setBooks(books.map((b) => (b.id === selectedBook.id ? response.data : b)));
        showMessage("success", "Book updated successfully!");
      } else {

        const response = await addBook(bookData);
        setBooks([...books, response.data]);
        showMessage("success", "Book added successfully!");
      }
      setShowForm(false);
    } catch (error) {
      showMessage("danger", "Something went wrong while saving the book.");
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await deleteBook(id);
      setBooks(books.filter((b) => b.id !== id));
      showMessage("success", "Book deleted successfully!");
    } catch (error) {
      showMessage("danger", "Could not delete the book.");
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>
            <FaBook className="me-2" />
            Book Store Management
          </Navbar.Brand>
          <Button variant="success" onClick={handleAddClick}>
            <FaPlus /> Add Book
          </Button>
        </Container>
      </Navbar>

      <Container>
        {/* Success / error message (only shows if message is not null) */}
        {message && <Alert variant={message.type}>{message.text}</Alert>}

        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" />
          </div>
        ) : books.length === 0 ? (
          <Alert variant="info">No books found. Click "Add Book" to create one.</Alert>
        ) : (
          // Responsive grid: 1 column on phones, 2 on tablets, 3 on laptops, 4 on large screens
          <Row xs={1} md={2} lg={3} xl={4} className="g-4 mb-5">
            {/* .map() loops over the array and creates one card per book */}
            {books.map((book) => (
              <Col key={book.id}>
                <BookCard
                  book={book}
                  onEdit={handleEditClick}
                  onDelete={handleDelete}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <BookFormModal
        show={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleSave}
        book={selectedBook}
      />
    </>
  );
}

export default App;