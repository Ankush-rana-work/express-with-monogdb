const router = require('express').Router();
const CategoryController = require('../controllers/categoryController');
const categorySchema = require('../requestSchema/categorySchema');

router.get('/list', CategoryController.show);
router.post('/add', categorySchema.add, CategoryController.add);
router.put('/edit/:categoryId', categorySchema.add, CategoryController.edit);
router.delete('/delete/:categoryId', CategoryController.delete);

module.exports = router;