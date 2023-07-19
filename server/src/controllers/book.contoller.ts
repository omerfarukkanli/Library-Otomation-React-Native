import Book, { IBook } from "../models/book.model";
import { Request, Response } from "express";
import mongoose from "mongoose";
import fs from "fs"
import { uploadImage } from "../utils/cloudinary";

export const createBook = async (req: Request, res: Response) => {
    const { title, isbn, authors, genre, image } = req.body;
    try {
        const imageUpload = await uploadImage(image)
        console.log(imageUpload)
        const book: IBook = await Book.create({
            title: title,
            isbn: isbn,
            authors: authors,
            genre: genre,
            coverImage: imageUpload.secure_url
        })
        res.status(201).json({ book });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.find();
        res.status(201).json({ books });
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

