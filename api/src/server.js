const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
    return response.json({ status: "Running", port: 3030 });
});

app.listen('3030');
