const router = require('express').Router();
const { data, getByISBNlist, getByISBNlistLink, getAuthorsBook, addBook, addMagazine } = require('../controller/books');

router.get('/', data);
router.post('/isbn', getByISBNlist);
router.get('/isbn/:isbn', getByISBNlistLink);
router.post('/author', getAuthorsBook);
router.post('/addbook', addBook);
router.post('/addmagazine', addMagazine);



module.exports = router;