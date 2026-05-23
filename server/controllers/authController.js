const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");    




// register user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

         const userExists = await User.findOne({ email });
         if(userExists) {
            return res.status(400).json({ message: "User already exists" });
         };
            //hashing password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            //Save user
            const user = new User({
                name,
                email,
                password: hashedPassword,
            });
            await user.save();

            // JWT TOKEN
            const token = jwt.sign(
                {id: user._id},
                process.env.JWT_SECRET,
                {expiresIn: "7d"}
            );
            res.status(201).json({
                success: true,
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            })
           
         
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    registerUser,
}