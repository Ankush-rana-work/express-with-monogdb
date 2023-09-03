const { sendSucess } = require("../../util/commonHelper");
const userService = require("../services/userService");


const UserController = {
    register: async (req, res, next) => {
        try {
            // this will check email not already exist then save user to database
            const response = await userService.registerUser(req);
            sendSucess(res, response.statusCode, response.message , response.savedUser);
        } catch (error) {
            next(error);
        }
    },
    login: async(req, res, next) =>{
        try{
            const response = await userService.loginUser(req);
            sendSucess(res, response.statusCode, response.message , response.user);
        }catch(error){
            next(error);
        }
    },
    refreshToken: async(req, res, next)=>{
        try{
            const response = await userService.refreshTokenUser(req);
            sendSucess(res, response.statusCode, response.message , response.user);
        }catch(error){
            next(error)
        }
    }
};

module.exports = UserController;