const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const {notFound, errorHandler} = require('./middlewares')
const api = require('./routes')

const { DATABASE_URL } = require('./config')

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
  origin:"*"
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🦄'
  });
});


app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);



module.exports = app;
