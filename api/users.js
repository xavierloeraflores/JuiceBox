const express = require('express')
const router =  express.Router();
const jwt = require('jsonwebtoken')
const { getAllUsers, getUserByUsername, createUser } = require('../db');


router.use((req, res, next) => {
    console.log('A request has been made to /users')
    // res.send({message: 'hello from /users!'})
    next();

})




router.get('/', async (req, res, next) => {
    const users = await getAllUsers();

  res.send({
    users
  });
    
})


router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
  
    // request must have both
    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password"
      });
    }
  
    try {
      const user = await getUserByUsername(username);
      console.log(process.env.JWT_SECRET)
  
      if (user && user.password == password) {
        // create token & return to user

        const token = jwt.sign({ 
        id: user.id, 
        username
        }, process.env.JWT_SECRET, {
        expiresIn: '1w'
        });

        res.send({ 
        message: "you're logged in!",
        token 
        });        
      } else {
        next({ 
          name: 'IncorrectCredentialsError', 
          message: 'Username or password is incorrect'
        });
      }
    } catch(error) {
      console.log(error);
      next(error);
    }
  });

router.post('/register', async (req, res, next) => {
  const { username, password, name, location } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists'
      });
    }

    const user = await createUser({
      username,
      password,
      name,
      location,
    });

    const token = jwt.sign({ 
      id: user.id, 
      username
    }, process.env.JWT_SECRET, {
      expiresIn: '1w'
    });

    res.send({ 
      message: "thank you for signing up",
      token 
    });
  } catch ({ name, message }) {
    next({ name, message })
  } 
});

module.exports = router





