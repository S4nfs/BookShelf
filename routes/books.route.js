const router = require('express').Router();
const { books } = require('../controller/books');


router.get('/', books)

// router.get('/books', (req, res, next) => {
//     res.render('index');
// })


module.exports = router;