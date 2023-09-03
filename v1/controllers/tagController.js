const { sendSucess } = require("../../util/commonHelper");
const tagService = require("../services/tagsService");

const TagController = {
    show: async (req, res, next) => {
        try {
            const response = await tagService.showTag(req);
            sendSucess(res, response.statusCode, response.message , response.tags);
        } catch (error) {
            next(error);
        }
    },
    add: async(req, res, next) =>{
        try{
            const response = await tagService.addTag(req);
            sendSucess(res, response.statusCode, response.message , response.user);
        }catch(error){
            next(error);
        }
    },
    edit: async(req, res, next)=>{
        try{
            const response = await tagService.editTag(req);
            sendSucess(res, response.statusCode, response.message , response.user);
        }catch(error){
            next(error)
        }
    },
    delete: async(req, res, next)=>{
        try{
            const response = await tagService.deleteTag(req);
            sendSucess(res, response.statusCode, response.message , response.deleteTag);
        }catch(error){
            next(error)
        }
    }
};

module.exports = TagController;