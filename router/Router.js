const router = require('express').Router();

const db = require('../db/connection')


//How many posts we want to show on each page...
const resultsPerPage = 12;

router.get('/', async (req, res) => {
    try {
        let query = `SELECT * FROM items;`;
        await db.query(query, (err, result) => {
            if (err) throw err;

            res.render('data', { data: result })
        })
    } catch (error) {
        console.log(error);
    }
})







module.exports = router;