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
// .on('end', () => console.log("Authors->", authdata));

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

//get all data
exports.data = async (req, res) => {
    try {
        let data = await createBookShelf(authdata, bdata, mdata)
        return res.render('index', { data: data })
    } catch (error) {
        return res.render('404', error)
    }
}
//get books & magazines by ISBN number
exports.getByISBNlist = async (req, res, next) => {
    try {
        let data = {};
        const { isbn } = req.body;
        foundB = await bdata.find((book) => book.isbn == isbn.trim())
        if (typeof (foundB) != "undefined") { data.book = foundB }
        foundM = await mdata.find((mag) => mag.isbn == isbn.trim())
        if (typeof (foundM) != "undefined") { data.magazine = foundM }
        return res.render('isbn', { data: data })
    } catch (error) {
        return res.render('404', error)
    }
}
exports.getByISBNlistLink = async (req, res, next) => {
    try {
        let data;
        const { isbn } = req.params;
        data = await bdata.find((book) => book.isbn === isbn)
        data = await mdata.find((mag) => mag.isbn === isbn)
        return res.render('isbn', { data: data })
    } catch (error) {
        return res.render('404', error)
    }
}

exports.getAuthorsBook = async (req, res, next) => {
    try {
        const { email } = req.body;
        let data = await createBookShelf(authdata, bdata, mdata).find((authObj) => authObj.email == email)
        return res.render('author', { data: data })
    } catch (error) {
        return res.render('404', error)
    }
}

//add a book
exports.addBook = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length < 4) {
            return res.render('404')
        } else {
            const { title, isbn, authors, description } = req.body;
            await csv.writeToStream(fs.createWriteStream(path.resolve(__dirname, "../public/uploads/", "books.csv"),
                { flags: 'a' }),
                [
                    [""],
                    [title, isbn, authors, description]
                ], { headers: false }, { ignoreEmpty: true }).on('error', error => console.error(error))
            return res.redirect('/')
        }
    } catch (error) {
        return res.render('404', { error: error })
    }
}

//add a magazine
exports.addMagazine = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length < 4) {
            return res.render('404')
        } else {
            const { title, isbn, authors, publishedAt } = req.body;
            await csv.writeToStream(fs.createWriteStream(path.resolve(__dirname, "../public/uploads/", "magazines.csv"),
                { flags: 'a' }),
                [
                    [""],
                    [title, isbn, authors, publishedAt]
                ], { headers: false }, { ignoreEmpty: true }).on('error', error => console.error(error))
            return res.redirect('/')
        }
    } catch (error) {
        return res.render('404', { error: error })
    }
}
