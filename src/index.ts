import express from "express";
import mongoose from "mongoose";
import connectdb from './config/db';
import dotenv from 'dotenv';
import bookRoute from './route/bookroute';

dotenv.config();
connectdb();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/books', bookRoute);

app.get('/', (req, res) => {
  res.send('Bookstore, TypeScript with MongoDB!');
});

app.listen(port, () => console.log(`server started on port ${port}`));

export default app;
