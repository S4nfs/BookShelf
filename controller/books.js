const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
// const { createBookshelves } = require('./bookshelfBuilder')
let authdata = [];
let bdata = [];
let mdata = [];

const options = {
    objectMode: true,
    delimiter: ";",
    quote: null,
    headers: true,
    renameHeaders: false,
};

fs.createReadStream(path.resolve(__dirname, "../public/uploads/", "authors.csv"))
    .pipe(csv.parse(options))
    .on('error', error => console.error(error))
    .on('data', row => authdata.push(row))
    .on('end', () => console.log("Authors->", authdata));

fs.createReadStream(path.resolve(__dirname, "../public/uploads/", "books.csv"))
    .pipe(csv.parse(options))
    .on('error', error => console.error(error))
    .on('data', row => bdata.push(row))
// .on('end', () => console.log("Books->", bdata));

fs.createReadStream(path.resolve(__dirname, "../public/uploads/", "magazines.csv"))
    .pipe(csv.parse(options))
    .on('error', error => console.error(error))
    .on('data', row => mdata.push(row))
// .on('end', () => console.log("Mags->", mdata));

const createBookShelf = (data, books, magazines, options = []) => {
    data.forEach(elem => {
        let book = findBookByAuthor(books, elem.email)
        let magazine = findMagByAuthor(magazines, elem.email)

        options.push({
            email: elem.email,
            firstname: elem.firstname,
            lastname: elem.lastname,
            books: book.length > 0 ? book : [],
            magazines: magazine.length > 0 ? magazine : []
        });
    });
    return options;
}

const findBookByAuthor = (books, authorId, mybook = []) => {
    if (typeof (books) === 'undefined' || books === null) return 0;
    for (var i = 0; i < books.length; i++) {
        for (key in books[i]) {
            if (books[i][key].indexOf(authorId) != -1) {
                mybook.push(books[i]);
            }
        }
    }
    return mybook
}
const findMagByAuthor = (mags, authorId, myMag = []) => {
    if (typeof (mags) === 'undefined' || mags === null) return 0;
    for (var i = 0; i < mags.length; i++) {
        for (key in mags[i]) {
            if (mags[i][key].indexOf(authorId) != -1) {
                myMag.push(mags[i]);
            }
        }
    }
    return myMag
}


exports.books = (req, res) => {
    var data = createBookShelf(authdata, bdata, mdata)
    res.render('index', data)
}