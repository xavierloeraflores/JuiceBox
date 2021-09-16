const express = require('express')
const router =  express.Router();

router.use((req, res, next) => {
    console.log('A request has been made to /users')
    res.send({message: 'hello from /users!'})

})

router.get('/', (req, res, next) => {
    
})



module.exports = router





