
let obj = [{ "email": "null-walter@echocat.org", "firstname": "Paul", "lastname": "Walter" }, { "email": "null-mueller@echocat.org", "firstname": "Max", "lastname": "Müller" }, { "email": "null-ferdinand@echocat.org", "firstname": "Franz", "lastname": "Ferdinand" }, { "email": "null-gustafsson@echocat.org", "firstname": "Karl", "lastname": "Gustafsson" }, { "email": "null-lieblich@echocat.org", "firstname": "Werner", "lastname": "Lieblich" }, { "email": "null-rabe@echocat.org", "firstname": "Harald", "lastname": "Rabe" }]

let books = [
    {
        "title": "Ich helfe dir kochen. Das erfolgreiche Universalkochbuch mit großem Backteil",
        "isbn": "5554-5545-4518",
        "authors": "null-walter@echocat.org",
        "description": "Auf der Suche nach einem Basiskochbuch steht man heutzutage vor einer Fülle von Alternativen. Es fällt schwer, daraus die für sich passende Mixtur aus Grundlagenwerk und Rezeptesammlung zu finden. Man sollte sich darüber im Klaren sein, welchen Schwerpunkt man setzen möchte oder von welchen Koch- und Backkenntnissen man bereits ausgehen kann."
    },
    {
        "title": "Das große GU-Kochbuch Kochen für Kinder",
        "isbn": "2145-8548-3325",
        "authors": "null-ferdinand@echocat.org,null-lieblich@echocat.org",
        "description": "Es beginnt mit... den ersten Löffelchen für Mami, Papi und den Rest der Welt. Ja, und dann? Was Hersteller von Babynahrung können, das ist oft im Handumdrehen auch selbst gemacht, vielleicht sogar gesünder, oftmals frischer. Ältere Babys und Schulkinder will das Kochbuch ansprechen und das tut es auf eine verspielte Art angenehm altersgemäß."
    },
    {
        "title": "Schlank im Schlaf ",
        "isbn": "4545-8558-3232",
        "authors": "null-gustafsson@echocat.org",
        "description": "Schlank im Schlaf klingt wie ein schöner Traum, aber es ist wirklich möglich. Allerdings nicht nach einer Salamipizza zum Abendbrot. Die Grundlagen dieses neuartigen Konzepts sind eine typgerechte Insulin-Trennkost sowie Essen und Sport im Takt der biologischen Uhr. Wie die Bio-Uhr tickt und was auf dem Speiseplan stehen sollte, hängt vom persönlichen Urtyp ab: Nomade oder Ackerbauer?"
    }]
let magazines = [{ "title": "Beautiful cooking", "isbn": "5454-5587-3210", "authors": "null-walter@echocat.org", "publishedAt": "21.05.2011" }, { "title": "My familie and me", "isbn": "4545-8541-2012", "authors": "null-mueller@echocat.org", "publishedAt": "10.07.2011" }, { "title": "Cooking for gourmets", "isbn": "2365-5632-7854", "authors": "null-lieblich@echocat.org,null-walter@echocat.org", "publishedAt": "01.05.2012" }, { "title": "Gourmet", "isbn": "2365-8745-7854", "authors": "null-ferdinand@echocat.org", "publishedAt": "14.06.2010" }, { "title": "The Wine Connoisseurs", "isbn": "2547-8548-2541", "authors": "null-walter@echocat.org", "publishedAt": "12.12.2011" }, { "title": "Vinum", "isbn": "1313-4545-8875", "authors": "null-gustafsson@echocat.org", "publishedAt": "23.02.2012" }]



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


console.log(createBookShelf(obj, books, magazines))

// module.exports = { createBookShelf };