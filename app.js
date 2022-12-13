const express = require('express');
const morgan = require('morgan');
const bookshelf = require('./routes/books.route')
const app = express();

//middlewares
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('', bookshelf)

app.listen(5000, () => {
    console.log(`Server is running on port 5000`)
})