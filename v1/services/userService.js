const User = require('../../models/userModel');
const CustomError = require('../../util/customError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Role = require('../../models/roleModel');

const userService = {
    registerUser: async (req) => {
        const { firstName, lastName, email, dob, password, role } = req.body;
        try {
            // Check if email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new CustomError('Email already exists', 400);
            }

            // check if role exist
            const roleExist = await Role.findOne({ slug: role });
            if (!roleExist) {
                throw new CustomError('Role is not exist', 400);
            }

            // Hash the password before storing it in the database
            const hasheddpassword = await bcrypt.hash(password, 10);
            // saving user data on database
            const newUser = new User({
                firstName,
                lastName,
                password: hasheddpassword,
                email,
                dob,
                role: roleExist._id
            });

            let savedUser = await newUser.save();
            const tokens = userService.generateToken(savedUser);
            savedUser = { ...savedUser.toObject(), ...tokens };
            delete savedUser.__v;
            delete savedUser.password;
            return { statusCode: 201, message: 'User registered successfully', savedUser };

        } catch (error) {
            throw error;
        }
    },
    generateToken: (user) => {
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_SECRET_KEY, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN, { expiresIn: '7d' });
        return { accessToken, refreshToken };
    },
    loginUser: async (req) => {
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email }).populate({
                path: 'role',
                select: 'name slug description ', // Include only the specified fields
            });
            ;
            if (!user) {
                throw new CustomError('Invalid credentials', 400);
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new CustomError('Invalid credentials', 400);
            }

            // generating token
            const tokens = userService.generateToken(user);
            user = { ...user.toObject(), ...tokens };
            delete user.__v;
            delete user.password;
            return { statusCode: 201, message: 'User login successfully', user };

        } catch (error) {
            throw error;
        }
    },
    refreshTokenUser: async (req) => {
        try {
            const { refreshToken } = req.body;
            // Verify the refresh token
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
            const userId = decoded.userId;

            let user = await User.findOne({ _id: userId }).populate({
                path: 'role',
                select: 'name slug description ', // Include only the specified fields
            });
            const tokens = userService.generateToken(user);
            user = { ...user.toObject(), ...tokens };
            delete user.__v;
            delete user.password;
            // generating token

            return { statusCode: 201, message: 'Refresh token generated successfully', user };
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                throw new CustomError('Refresh token expired', 401);
            }
            throw error;
        }
    }
}

module.exports = userService;