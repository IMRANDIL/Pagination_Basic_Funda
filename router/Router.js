const router = require('express').Router();

const db = require('../db/connection')


//How many posts we want to show on each page...
const resultsPerPage = 12;

router.get('/', async (req, res) => {
    try {
        let query = `SELECT * FROM items;`;
        await db.query(query, (err, result) => {
            if (err) throw err;
            const numOfResults = result.length;
            const numberOfPages = Math.ceil(numOfResults / resultsPerPage);

            let page = req.query.page ? Number(req.query.page) : 1;
            if (page > numberOfPages) {
                res.redirect(`/?page=${encodeURIComponent(numberOfPages)}`)
            } else if (page < 1) {
                res.redirect(`/?page=${encodeURIComponent(1)}`);
            }

            //Determine the SQL limit starting number

            const startingLimit = (page - 1) * resultsPerPage;
            //Get the relevant number of posts for this starting page

            query = `SELECT * FROM items LIMIT ${startingLimit},${resultsPerPage}`;

            db.query(query, (err, result) => {
                if (err) throw err;
                let iterator = (page - 5) < 1 ? 1 : page - 5;

                let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
                if (endingLink < (page + 4)) {
                    iterator -= (page + 4) - numberOfPages;
                }
                res.render('data', { data: result, page, iterator, endingLink, numberOfPages })
            })





        })
    } catch (error) {
        console.log(error);
    }
})







module.exports = router;