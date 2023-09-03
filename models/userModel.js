const mongoose = require('../config/db');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, requird: true },
  email: { type: String, required: true, unique: true },
  dob: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
