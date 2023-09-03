const CustomError = require('../../util/customError');
const { default: mongoose } = require('mongoose');
const Post = require('../../models/postModel');

const postService = {
    showPost: async (req) => {
        // Extract query parameters from the request body or use default values
        const perPage = req.body.perPage || 20;
        const pageNo = req.body.pageNo || 1;

        try {
            // Query the Category collection to retrieve a paginated list of categories
            const categories = await Post.find()
                .skip((pageNo - 1) * perPage) // Calculate the number of documents to skip
                .limit(perPage) // Limit the number of documents 
                .select('-__v -createdAt'); // Exclude __v and createdAt fields from the results

            // Check if any categories were found
            if (categories.length > 0) {
                return { statusCode: 200, message: 'Category list', category: categories };
            } else {
                return { statusCode: 200, message: 'Category not available', category: null };
            }
        } catch (error) {
            // Handle errors by throwing them, allowing the error to be caught at a higher level
            throw error;
        }
    },
    addPost: async (req) => {
        const { name, slug, parentId } = req.body;

        try {

            // Check if parentId is provided and is a valid ObjectId
            if (parentId && !mongoose.Types.ObjectId.isValid(parentId)) {
                throw new CustomError('Parent category ID is not valid', 400);
            }

            // If parentId is provided, check if the parent category exists
            if (parentId) {
                const isCategoryExist = await Category.findOne({ _id: parentId });
                if (!isCategoryExist) {
                    throw new CustomError('Parent category does not exist', 400);
                }
            }

            // Check if a category with the same slug already exists
            const isCategorySlugExist = await Category.findOne({ slug });
            if (isCategorySlugExist) {
                throw new CustomError('Slug already exists', 400);
            }

            // Create a new category document with the provided data
            let newCategory = new Category({
                name,
                slug,
                subcategories: parentId,
            });

            // Save the new category to the database
            newCategory = await newCategory.save();

            return { statusCode: 201, message: 'Category has been created', category: newCategory };
        } catch (error) {
            // Handle errors by throwing them, allowing the error to be caught at a higher level
            throw error;
        }

    },
    editPost: async (req) => {
        try {
            const categoryId = req.params.categoryId;
            const { name, slug, parentId } = req.body;

            // Check if categoryId is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(categoryId)) {
                throw new CustomError('category is not valid', 400);
            }

            // Find the category by ID
            let category = await Category.findOne({ _id: categoryId });
            if (!category) {
                throw new CustomError('Category is not available', 400);
            }

            // Check if parentId is a valid ObjectId
            if (parentId && !mongoose.Types.ObjectId.isValid(parentId)) {
                throw new CustomError('category parent id is not valid', 400);
            }

            // If parentId is provided, check if the parent category exists
            if (parentId) {
                let parentCategory = await Category.findOne({ _id: parentId });
                if (!parentCategory) {
                    throw new CustomError('Parent category is not available', 400);
                }
            }

            // Check if the slug is already in use by another category
            let categorySlug = await Category.findOne({ slug, _id: { $ne: categoryId } });
            if (categorySlug) {
                throw new CustomError('Slug already exist', 400);
            }

            // Update category values
            category.name = name;
            category.slug = slug;
            category.subcategories = parentId;
            await category.save();

            return { statusCode: 200, message: 'Category successfully updated', category };
        } catch (error) {
            throw error;
        }
    },
    deletePost: async (req) => {
        try {
            const categoryId = req.params.categoryId;
            if (!mongoose.Types.ObjectId.isValid(categoryId)) {
                throw new CustomError('Category is not valid', 400);
            }

            let category = await Category.findOne({ _id: categoryId });
            if (!category) {
                throw new CustomError('Category is not available', 400);
            }

            const deleteCategory = await Category.findByIdAndDelete(categoryId);
            return { statusCode: 200, message: 'Successfully tags deleted', category:deleteCategory };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = postService;