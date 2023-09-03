const router = require('express').Router();
const TagController = require('../controllers/tagController');
const tagSchema = require('../requestSchema/tagSchema');

router.get('/list', TagController.show);
router.post('/add', tagSchema.add, TagController.add);
router.put('/edit/:tagId', tagSchema.add, TagController.edit);
router.delete('/delete/:tagId', TagController.delete);

module.exports = router;