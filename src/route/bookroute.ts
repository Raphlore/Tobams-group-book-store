import express, { Request, Response } from 'express';
import Book from '../model/bookmodel';
import upload from '../middleware/upload';

const router = express.Router();

interface BookRequestBody {
  title: string;
  author: string;
  publishYear: number;
  ISBN: string;
}

// Create book
router.post('/', async (request: Request<{}, {}, BookRequestBody>, response: Response) => {
  try {
    const { title, author, publishYear, ISBN } = request.body;

    if (!title || !author || !publishYear || !ISBN) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear, ISBN',
      });
    }

    const newBook = { title, author, publishYear, ISBN };
    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.error((error as Error).message);
    response.status(500).send({ message: (error as Error).message });
  }
});

// Update book cover picture
router.patch('/update-cover/:id', upload.single('coverPicture'), async (request: Request, response: Response) => {
  try {
    const bookId = request.params.id;
    const coverPicture = request.file?.path;

    if (!coverPicture) {
      return response.status(400).send({
        message: 'Cover picture is required',
      });
    }

    const book = await Book.findByIdAndUpdate(bookId, { coverPicture }, { new: true });

    if (!book) {
      return response.status(404).send({
        message: 'Book not found',
      });
    }

    return response.status(200).json({
      message: 'Cover picture updated successfully',
      data: book,
    });
  } catch (error) {
    console.error((error as Error).message);
    response.status(500).send({ message: (error as Error).message });
  }
});

// Alternative endpoint to update book cover picture
router.put('/alt/update-cover/:id', async (request: Request, response: Response) => {
  try {
    const bookId = request.params.id;
    const { coverPicture } = request.body;

    if (!coverPicture) {
      return response.status(400).send({
        message: 'Send all required fields',
      });
    }

    const book = await Book.findByIdAndUpdate(bookId, { coverPicture }, { new: true });

    if (!book) {
      return response.status(404).send({
        message: 'Book not found',
      });
    }

    return response.status(200).json({
      message: 'Cover picture updated successfully',
      data: book,
    });
  } catch (error) {
    console.error((error as Error).message);
    response.status(500).send({ message: (error as Error).message });
  }
});

// Get all books
router.get('/', async (request: Request, response: Response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error((error as Error).message);
    response.status(500).send({ message: (error as Error).message });
  }
});

// Get a single book
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);

    if (!book) {
      return response.status(404).send({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book fetched successfully', data: book });
  } catch (error) {
    console.error((error as Error).message);
    response.status(500).send({ message: (error as Error).message });
  }
});

// Update a book
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { title, author, publishYear, ISBN } = request.body;

    if (!title && !author && !publishYear && !ISBN) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear, ISBN',
      });
    }

    const book = await Book.findByIdAndUpdate(id, request.body, { new: true });

    if (!book) {
      return response.status(404).send({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book updated successfully', data: book });
  } catch (error) {
    console.error((error as Error).message);
    response.status(500).send({ message: (error as Error).message });
  }
});

// Delete book
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return response.status(404).send({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error((error as Error).message);
    response.status(500).send({ message: (error as Error).message });
  }
});

export default router;
