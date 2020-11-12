const express =  require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 5000


const database = require("./services/database");
const BookRouter = require("./routes/books.router")

app.use(express.json())
app.use("/api/bookstore", BookRouter)
database.connect();


app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
})

