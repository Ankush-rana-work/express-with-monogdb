// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

const authMiddleware = async (req, res, next) => {
  // Extract the token from the request (e.g., from headers or cookies)
  const token = req.headers.authorization? req.headers.authorization.split(' ')[1]:null;

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    
    const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    // Find the user based on the decoded token (e.g., user ID)
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      throw new CustomError('User not found', 400);
    }

    // Attach the user to the request for further route handling
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
