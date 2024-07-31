import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../index'; // Adjust the path to your Express app
import Book, { IBook } from '../model/bookmodel'; // Adjust the path to your Book model

dotenv.config();



afterAll(async () => {
  // Clean up and close database connection after all tests
  await mongoose.connection.close();
});

describe('Books API', () => {
  it('should create a new book', async () => {
    const response = await request(app)
      .post('/api/books')
      .send({
        title: 'Test Book',
        author: 'Test Author',
        publishYear: 2024,
        ISBN: '978-3-16-148410-0'
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Book');
    expect(response.body.author).toBe('Test Author');
    expect(response.body.publishYear).toBe(2024);
    expect(response.body.ISBN).toBe('978-3-16-148410-0');
  }, 10000);

  it('should update coverPicture by ID', async () => {
    const book = await Book.create({
      title: 'Test Book',
      author: 'Test Author',
      publishYear: 2024,
      ISBN: '978-3-16-148410-0'
    })

    const response = (await request(app).put(`/api/books/alt/update-cover/${book._id}`).send({
      coverPicture: 'www.tobamsgroup.com',
    }))
    

    expect(response.status).toBe(200);
    expect(response.body.data.coverPicture).toBe('www.tobamsgroup.com');
    
  }, 10000);
  ;

  it('should get all books', async () => {
    const book = await Book.create({
      title: 'Test Book',
      author: 'Test Author',
      publishYear: 2024,
      ISBN: '978-3-16-148410-0'
    })

    const response = await request(app).get('/api/books');

    expect(response.status).toBe(200);
    expect(response.body.count).toBeGreaterThan(0);
    expect(response.body.data[0].title).toBe('Test Book');
  }, 10000);

  it('get a single book by ID', async () => {
    const book = await Book.create({
      title: 'Test Book',
      author: 'Test Author',
      publishYear: 2024,
      ISBN: '978-3-16-148410-0'
    })

    const response = (await request(app).get(`/api/books/${book._id}`))
    

    expect(response.status).toBe(200);
    expect(response.body.data.title).toBe('Test Book');
    
  }, 10000);
  });



 
  it('should update a single book by ID', async () => {
    const book = await Book.create({
      title: 'Test Book',
      author: 'Test Author',
      publishYear: 2024,
      ISBN: '978-3-16-148410-0'
    })

    const response = (await request(app).put(`/api/books/${book._id}`).send({
      title: 'Updated Test Book',
    }))
    

    expect(response.status).toBe(200);
    expect(response.body.data.title).toBe('Updated Test Book');
    
  }, 10000);
  ;

  it('should delete a book', async () => {
    const book = await Book.create({
      title: 'Test Book',
      author: 'Test Author',
      publishYear: 2024,
      ISBN: '978-3-16-148410-0'
    })

    const response = await request(app).delete(`/api/books/${book._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Book deleted successfully');

});
function send(arg0: { title: string; author: string; }) {
  throw new Error('Function not implemented.');
}

