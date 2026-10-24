import axios from "axios";
import SERVER_URL from "./serverurl";

const API_URL = `${SERVER_URL}/books`;

export const getBooks = () => axios.get(API_URL);

export const addBook = (book) => axios.post(API_URL, book);

export const updateBook = (id, book) => axios.put(`${API_URL}/${id}`, book);

export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`);