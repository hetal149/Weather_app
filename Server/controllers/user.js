import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import UserModal from "../models/user.js";

const secret = process.env.SECRET;

export const signin = async(req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await UserModal.findOne({ email });

        if (!oldUser) return res.status(404).json({ errors: [{ msg: 'User Does Not Exist' }] });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });


        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
        res.status(200).json({ result: oldUser, token });

    } catch (err) {

        res.status(500).json({ message: "Something went wrong" });
    }
};

export const signup = async(req, res) => {

    const { email, password, username, fname } = req.body;

    try {
        const oldUser = await UserModal.findOne({ email });

        if (oldUser) return res.status(400).json({ errors: 'User already exist' });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModal.create({ email: email, password: hashedPassword, fname: fname, username: username });

        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });


    }
};