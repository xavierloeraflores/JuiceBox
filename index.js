const express = require('express')
const server = express()

const PORT = 3000

server.listen(PORT, ()=>{
    console.log('The server is up on port', PORT)
})

const bodyParser = require('body-parser');
server.use (bodyParser.json())

const morgan = require('morgan')
server.use(morgan('dev'))



server.use((req, res, next) => {
    console.log('Request:')
    console.log('URL:', req.url)
    console.log('Method', req.method)
    next()
})


server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
});



server.use('/api', (req, res, next) => {
    console.log("A request was made to /api");
    next();
});


const apiRouter = require('./api');
server.use('/api', apiRouter);
