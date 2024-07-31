import { Schema, model, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  publishYear: number;
  ISBN: string;
  coverPicture?: string;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishYear: { type: Number, required: true },
  ISBN: { type: String, required: true },
  coverPicture: { type: String }
});

const Book = model<IBook>('Book', bookSchema);

export default Book;
