const express = require('express');
const app = express();
const port = process.env.SERVERPORT || 3001;
const cors = require('cors')
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.post('/sf/main', (req, res) => {
    const receivedData = req.body;
    console.log(`data received: ${receivedData}`);
    res.send('Data received');
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})