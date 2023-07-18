import Book, { IBook } from "../models/book.model";
import { Request, Response } from "express";
import mongoose from "mongoose";
import fs from "fs"
import uploadImage from "../utils/cloudinary";
export const createBook = async (req: Request, res: Response) => {
    try {
        const { title, isbn, authors, genre, image } = req.body;
        const uplodImage = await uploadImage(image)
        const book: IBook = new Book({
            title,
            isbn,
            authors,
            genre,
            coverImage: uplodImage.secure_url
        });

        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.find();
        books.map(async (book) => {
            const coverImage = `../uploads/${book.coverImage}`;
            const coverImageBuffer = fs.readFileSync(coverImage);
            const coverImageBase64 = coverImageBuffer.toString('base64');

            res.status(201).json({ coverImageBase64 });
        });


    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getBookById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const book = await Book.findById(id)
        if (book) res.status(200).json(book);
        else res.status(404).json({ message: "Böyle bir kitap bulunamadı" })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const upgradeBook = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { title, isbn, authors, genre, coverImage, }: IBook = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) res.status(404).json({ message: `there is no such product ${id}` })
    const updataBook = { title, isbn, authors, genre, coverImage, _id: id }
    await Book.findByIdAndUpdate(id, updataBook)
    res.json(updataBook)
}

export const deleteBook = async (req: Request, res: Response) => {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) res.status(404).json({ message: `there is no such product ${id}` })
    await Book.findByIdAndRemove(id)
}

