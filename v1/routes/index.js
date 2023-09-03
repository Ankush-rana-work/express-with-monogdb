const router            = require('express').Router();
const userRoutes        = require('./userRoutes');
const tagRoutes         = require('./tagRoutes');
const categoryRoutes    = require('./categoryRoutes');
const postRoutes        = require('./postRoutes')

// user routes
router.use('/user', userRoutes);
// tags
router.use('/tag', tagRoutes);
// catgeory
router.use('/category', categoryRoutes);
// Post
router.use('/post', postRoutes);


module.exports = router;