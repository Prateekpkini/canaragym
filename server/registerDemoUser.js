
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const registerDemoUser = async () => {
  await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/canaragym');

  try {
    const email = 'user@gmail.com';
    const password = '1234';
    const name = 'Demo User';

    let user = await User.findOne({ email });
    if (user) {
      console.log('Demo user already exists.');
      // Update password to plain text if it was hashed before
      user.password = password;
      await user.save();
      console.log('Demo user password updated to plain text.');
    } else {
      user = new User({
        name,
        email,
        password,
      });
      await user.save();
      console.log('Demo user created successfully.');
    }
  } catch (error) {
    console.error('Error creating demo user:', error);
  } finally {
    mongoose.disconnect();
  }
};

registerDemoUser();
