const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const { sendSuccess } = require('../utils/responseHandler');

const JWT_SECRET = process.env.JWT_SECRET || 'yoursecret';

// Signup
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return next(new ApiError('Email already in use', 409));
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    sendSuccess(res, user, 'User registered successfully', 201);
  } catch (err) {
    next(err);
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError('Invalid credentials', 401));
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return next(new ApiError('Invalid credentials', 401));
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

    sendSuccess(res, {
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    }, 'Login successful');
  } catch (err) {
    next(err);
  }
};
