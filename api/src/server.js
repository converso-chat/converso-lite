const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(router);

app.listen('3030');
