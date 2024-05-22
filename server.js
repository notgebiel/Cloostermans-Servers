const express = require('express');
const app = express();
const port = process.env.SERVERPORT || 3001;
const cors = require('cors')
const bodyParser = require('body-parser');
const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DB,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT
})
require('dotenv').config();



app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (req, res) => {
    res.json({info: 'cloostermans main server'});
});

const getShops = (req, res) => {
    pool.query('SELECT * FROM shops ORDER BY id ASC', (error, results) => {
        if(error) {
            throw error;
        }
        res.status(200).json(results.rows);
    }
)
};

const getShopById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
};

const createShop = (req, res) => {
    const {name, email, plan} = req.body;

    pool.query('INSERT INTO shops (name, email, plan) VALUES ($1, $2, $3) RETURNING *', [name, email, plan], (error, results) => {
        if(error) {
            throw error;
        }
        res.status(200).send()
    })
}

app.post('/sf/main', (req, res) => {
    const receivedData = req.body;
    console.log(`data received: ${receivedData}`);
    res.send('Data received');
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})