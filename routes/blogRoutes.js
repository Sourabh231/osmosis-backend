const express = require('express');
const {getAllBlogsController,
    creategrowingController} = require('../controllers/blogController');

//router object define
const router = express.Router();

//routes
//GET ||ALL BLOGS
router.get('/all-blog',getAllBlogsController);

//POST || create blog
router.post('/create-blog',creategrowingController);


// Export the router
module.exports = router;