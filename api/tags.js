const express = require('express');
const router = express.Router();
const { getAllUsers, getPostsByTagName } = require('../db');

router.use((req, res, next) => {
    console.log("A request is being made to /tags");

    next();

});

router.get('/', async (req, res, next) => {
    console.log('help')
    const users = await getAllUsers();
    console.log(users)
    console.log('bruh')
    res.send({
        users: [users]
    });

});


router.get('/:tagName/posts', async (req, res, next) => {
    // read the tagname from the params
    const tag = req.params.tagName
    try {
      // use our method to get posts by tag name from the db
      // send out an object to the client { posts: // the posts }
      const posts = await getPostsByTagName(tag)

      res.send({posts:posts})
    } catch ({ name, message }) {
        next({ name, message });
        // forward the name and message to the error handler
    }
  });



module.exports = router;