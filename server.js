const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./router/Router')
const path = require('path');

//static...
app.use(express.static(path.join(__dirname, 'public')));

//EJS...

app.set('view engine', 'ejs')


//middleware....

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router)





const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
})