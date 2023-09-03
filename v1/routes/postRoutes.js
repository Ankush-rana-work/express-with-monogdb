const PostController = require('../controllers/postController');
const postSchema = require('../requestSchema/postSchema');
const router = require('express').Router();


router.get('/list', PostController.show);
router.post('/add', postSchema.add, PostController.add);
router.put('/edit/:postId', postSchema.add, PostController.edit);
router.delete('/delete/:postId', PostController.delete);

module.exports = router;