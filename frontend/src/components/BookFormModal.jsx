import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

// What an empty form looks like
const emptyBook = {
  title: "",
  author: "",
  price: "",
  category: "",
  description: "",
  image: "",
  available: true,
};

function BookFormModal({ show, onClose, onSave, book }) {
  // formData holds what the user is typing right now
  const [formData, setFormData] = useState(emptyBook);
  // errors holds validation messages, e.g. { title: "Title is required" }
  const [errors, setErrors] = useState({});

  // Runs whenever the modal opens or the selected book changes.
  // If editing → fill form with that book. If adding → empty form.
  useEffect(() => {
    setFormData(book ? book : emptyBook);
    setErrors({});
  }, [book, show]);

  // One handler for ALL inputs. The input's "name" tells us which field changed.
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData, // keep all the old values
      [name]: type === "checkbox" ? checked : value, // update only this field
    });
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = "Enter a price greater than 0";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    setErrors(newErrors);

    // If there are no errors, send the data up to App.jsx
    if (Object.keys(newErrors).length === 0) {
      onSave({ ...formData, price: Number(formData.price) });
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{book ? "Edit Book" : "Add New Book"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={formData.title}
              onChange={handleChange}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              name="author"
              value={formData.author}
              onChange={handleChange}
              isInvalid={!!errors.author}
            />
            <Form.Control.Feedback type="invalid">
              {errors.author}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price (₹)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              name="category"
              value={formData.category}
              onChange={handleChange}
              isInvalid={!!errors.category}
            />
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cover Image URL</Form.Label>
            <Form.Control
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://covers.openlibrary.org/b/isbn/..."
              isInvalid={!!errors.image}
            />
            <Form.Control.Feedback type="invalid">
              {errors.image}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Check
            type="switch"
            id="available-switch"
            label="Available in stock"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {book ? "Update" : "Add"} Book
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BookFormModal;