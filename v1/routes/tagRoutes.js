const router = require('express').Router();
const TagController = require('../controllers/tagController');
const authMiddleware = require('../middleware/authMiddleware');
const tagSchema = require('../requestSchema/tagSchema');

router.get('/list', authMiddleware, TagController.show);
router.post('/add', authMiddleware, tagSchema.add, TagController.add);
router.put('/edit/:tagId', authMiddleware, tagSchema.add, TagController.edit);
router.delete('/delete/:tagId', authMiddleware, TagController.delete);

module.exports = router;