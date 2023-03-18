import User from "../models/user.model.js";
import dotenv from "dotenv";
import jwt from "jwt-simple";

const login = (req, res) => {

    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(404).send({ message: "No user found" });
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) {
                return res.status(500).send({ message: err.message });
            }
            if (!isMatch) {
                return res.status(401).send({ message: "Invalid email/password" });
            }
            const payload = { id: user.id };
            const token = jwt.encode(payload, process.env.JWT_SECRET);
            return res.status(200).send({ token });
        });

        // if (err) {
        //     return res.status(500).send({ message: err.message });
        // }
        // if (!user) {
        //     return res.status(404).send({ message: "No user found" });
        // }
        // user.comparePassword(req.body.password, (err, isMatch) => {
        //     if (err) {
        //         return res.status(500).send({ message: err.message });
        //     }
        //     if (!isMatch) {
        //         return res.status(401).send({ message: "Invalid email/password" });
        //     }
        //     const payload = { id: user.id };
        //     const token = jwt.encode(payload, process.env.JWT_SECRET);
        //     return res.status(200).send({ token });
        // });
    });
};

const profile = (req, res) => {
    res.json({
        message: "You made it to the secure route",
        user: req.user,
        token: req.query.secret_token
    })
};

export default { login, profile };
