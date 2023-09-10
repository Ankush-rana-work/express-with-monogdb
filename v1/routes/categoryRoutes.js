const router = require('express').Router();
const CategoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');
const categorySchema = require('../requestSchema/categorySchema');

router.get('/list', authMiddleware, CategoryController.show);
router.post('/add', authMiddleware, categorySchema.add, CategoryController.add);
router.put('/edit/:categoryId', authMiddleware, categorySchema.add, CategoryController.edit);
router.delete('/delete/:categoryId', authMiddleware, CategoryController.delete);

module.exports = router;