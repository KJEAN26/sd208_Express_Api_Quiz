const Book = require('../model/book.model');
const parseRequestBody = require('../utils/parseRequestBody');
const { response } = require('express');



//Create another book
const addBook = async (request, response) => {
    try {
        const book = {
            title: request.body.title,
            author: request.body.author,
            genre: request.body.genre,
            yearPublished: request.body.yearPublished,
            price: request.body.price
        };

         const newBook = new Book(book);
         const result = await newBook.save();

         if (!result){
             return response.status(400).json({
                 error: "Error in adding new book"
             })
         }

         response.status(200).json({
             message: "New book added"
         });
    } catch (e){
        return response.status(400).json({
            error: e
        })
    }
}


//Get all books in the store
const getBooks = async (request, response) => {
    try {
        const books = await Book.find();
        if(!books){
            return response.status(400).json({
                error: "Error in getting books"
            })
        }
        response.status(200).json({
            books: books
            
        })
    } catch (e){
        return response.status(400).json({
            error: e
        })
    }
}


//Get specific book by ID
const getBookById = async (request, response) => {
    try {
        const books = await Book.findOne({_id: request.params.id});
        if(!books || books.length === 0 ){
            return response.status(400).json({
                error: "Book not found"
            })
        }
        response.status(200).json({
            book: books
        })
    } catch (e) {
        return response.status(400).json({
            error: e
        })
    }
}



//Update details of a book
const updateBook = async (request, response) => {
    const updates = parseRequestBody(request.body);
    console.log(request.body);
    try {
        const result = await Book.updateOne(
            {_id: request.params.id},
            {$set: updates}
        );

        if(!result){
            return response.status(400).json({
                error: "Error in updating a book"
            })
        }
        return response.status(200).json({
            result: result

        })
       

    } catch (e) {
        return response.status(400).json({
            error: e
        })
    }
}


//Delete a book in the store
const deleteBook = async(request, response) => {
    try {
        await Book.deleteOne({_id: request.params.id}, (error, result) => {
            if(error){
                return response.status(400).json({
                    error: error
                })
            }
            response.status(200).json({
                message: "Successfully deleted a book",
                result: result
            })

        })

    } catch(e) {
        return response.status(400).json({
            error: e
        })
    }
}



module.exports = {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
}