const User = require('../models/User');

const addUser = async (req, res) => {
  try {
    const exist = await User.findOne({ sub: req.body.sub });

    if (exist) {
      return res.status(200).json({ msg: "user already exists" });
    }

    const newUser = new User(req.body);
    await newUser.save();
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  addUser,
  getUsers
};
