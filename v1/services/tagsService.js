const User = require('../../models/userModel');
const CustomError = require('../../util/customError');
const Tag = require('../../models/tagtModel');
const { default: mongoose } = require('mongoose');

const tagService = {
    showTag: async (req) => {
        const perPage    = req.body.perPage || 1;
        const pageNo     = req.body.pageNo || 1;
        
        try {
            const tags = await Tag.find()
            .skip((pageNo - 1) * perPage)
            .limit(perPage)
            .select('-__v -createdAt');

            if( tags ){
                return { statusCode: 200, message: 'Tag list', tags };
            }else{
                return { statusCode: 200, message: 'Tags not available', tags: null };
            }

        } catch (error) {
            throw error;
        }
    },
    addTag: async (req) => {
        const { title, slug } = req.body;
        try {
            const isTagExist = await Tag.findOne({ slug });
            console.log(isTagExist)
            if (isTagExist) {
                throw new CustomError('Slug already exist', 400);
            }

            // saving user data on database
            let newTag = new Tag({
                title,
                slug,
            });

            newTag = await newTag.save();
            return { statusCode: 201, message: 'Tags has been created', newTag };

        } catch (error) {
            throw error;
        }
    },
    editTag: async (req) => {
        try {
            const tagId = req.params.tagId;
            const { title, slug } = req.body;

            if (!mongoose.Types.ObjectId.isValid(tagId)) {
                throw new CustomError('tag is not available', 400);
            }

            let tag = await Tag.findOne({ _id: tagId });
            if (!tag) {
                throw new CustomError('tag is not available', 400);
            }

            // checking slug for tags is already exist in system
            let tagSlug = await Tag.findOne({ slug, _id: { $ne: tagId }  });
            if(tagSlug){
                throw new CustomError('Slug already exist', 400);
            }

            // updating in tags valyes
            tag.title = title;
            tag.slug = slug;
            tag.save();

            return { statusCode: 200, message: 'Tag successfully updated', tag };
        } catch (error) {
            throw error;
        }
    },
    deleteTag: async (req) => {
        try {
            const tagId = req.params.tagId;
            if (!mongoose.Types.ObjectId.isValid(tagId)) {
                throw new CustomError('tag is not available', 400);
            }

            let tag = await Tag.findOne({ _id: tagId });
            if (!tag) {
                throw new CustomError('tag is not available', 400);
            }

            const deleteTag = await Tag.findByIdAndDelete(tagId);
            return { statusCode: 200, message: 'Successfully tags deleted', deleteTag };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = tagService;