const { sendSucess } = require("../../util/commonHelper");
const categoryService = require("../services/categoryService");

const CategoryController = {
    show: async (req, res, next) => {
        try {
            const response = await categoryService.showCategory(req);
            sendSucess(res, response.statusCode, response.message , response.category);
        } catch (error) {
            next(error);
        }
    },
    add: async(req, res, next) =>{
        try{
            const response = await categoryService.addCategory(req);
            sendSucess(res, response.statusCode, response.message , response.category);
        }catch(error){
            next(error);
        }
    },
    edit: async(req, res, next)=>{
        try{
            const response = await categoryService.editCategory(req);
            sendSucess(res, response.statusCode, response.message , response.category);
        }catch(error){
            next(error)
        }
    },
    delete: async(req, res, next)=>{
        try{
            const response = await categoryService.deleteCategory(req);
            sendSucess(res, response.statusCode, response.message , response.category);
        }catch(error){
            next(error)
        }
    }
};

module.exports = CategoryController;