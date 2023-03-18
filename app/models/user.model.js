import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import passportlocalmongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
};

userSchema.plugin(passportlocalmongoose);

const User = mongoose.model("User", userSchema);

export default User;