const User = require('../model/User');
const bcrypt = require('bcryptjs');

exports.getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    }
    catch (err) {
        return console.log(err)
    }
    if (!users) {
        return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ users: users })

}



exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ email })
    }
    catch (err) {
        return console.log(err)
    }
    if (existingUser) {
        return res.status(400).json({ message: "User Already Exist" })

    }

    const hashedPassword = bcrypt.hashSync(password)
    const user = new User({ name, email, password: hashedPassword, blogs: [] });



    try {
        user.save();
    } catch (error) {
        return res.status(400).json({ message: 'User registration failed', error });
    }
    return res.status(201).json({ user });
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ email })
    }
    catch (err) {
        return console.log(err)
    }
    if (!existingUser) {
        return res.status(404).json({ message: "User Not Found" })

    }

    const isPassword = bcrypt.compareSync(password, existingUser.password)
    if (!isPassword) {
        return res.status(400).json({ message: "Incorrect Password" })
    }

    return res.status(200).json({ message: "Login Successful!" })
};
