const PostController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const postSchema = require('../requestSchema/postSchema');
const router = require('express').Router();


router.get('/list', authMiddleware, PostController.show);
router.post('/add', authMiddleware, postSchema.add, PostController.add);
router.put('/edit/:postId', authMiddleware, postSchema.add, PostController.edit);
router.delete('/delete/:postId', authMiddleware, PostController.delete);

module.exports = router;