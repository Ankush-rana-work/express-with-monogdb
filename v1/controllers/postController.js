const { sendSucess } = require("../../util/commonHelper");
const postService = require("../services/postService");

const PostController = {
    show: async (req, res, next) => {
        try {
            const response = await postService.showPost(req);
            sendSucess(res, response.statusCode, response.message , response.category);
        } catch (error) {
            next(error);
        }
    },
    add: async(req, res, next) =>{
        try{
            const response = await postService.addPost(req);
            sendSucess(res, response.statusCode, response.message , response.category);
        }catch(error){
            next(error);
        }
    },
    edit: async(req, res, next)=>{
        try{
            const response = await postService.editPost(req);
            sendSucess(res, response.statusCode, response.message , response.category);
        }catch(error){
            next(error)
        }
    },
    delete: async(req, res, next)=>{
        try{
            const response = await postService.deletePost(req);
            sendSucess(res, response.statusCode, response.message , response.category);
        }catch(error){
            next(error)
        }
    }
};

module.exports = PostController;