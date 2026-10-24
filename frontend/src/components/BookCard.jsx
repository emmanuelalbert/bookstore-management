import { Card, Badge, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

// "props" are inputs passed from the parent (App.jsx).
// We pull out the 3 we need using destructuring.
function BookCard({ book, onEdit, onDelete }) {
  return (
    <Card className="h-100 shadow-sm">
      {/* Book cover. If the image fails to load, show a placeholder instead */}
      <Card.Img
        variant="top"
        src={book.image}
        alt={book.title}
        style={{ height: "300px", objectFit: "cover" }}
        onError={(e) => {
          e.target.src = "https://placehold.co/300x450?text=No+Cover";
        }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>{book.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>

        <div className="mb-2">
          <Badge bg="info" className="me-2">{book.category}</Badge>
          {/* Show green or red badge depending on availability */}
          <Badge bg={book.available ? "success" : "danger"}>
            {book.available ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>

        <Card.Text className="small">{book.description}</Card.Text>

        {/* mt-auto pushes this section to the bottom of the card */}
        <div className="mt-auto">
          <h5 className="text-primary">₹{book.price}</h5>
          <Button
            variant="outline-primary"
            size="sm"
            className="me-2"
            onClick={() => onEdit(book)}
          >
            <FaEdit /> Edit
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onDelete(book.id)}
          >
            <FaTrash /> Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default BookCard;