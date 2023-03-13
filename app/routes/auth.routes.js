import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/user';

const router = express.Router();

router.post('/signup', (req, res) => {
    const { email, password, fname, lname } = req.body;
    const user = new User({ email, password, fname, lname });
    user.save((err) => {
        if (err) {
            return res.status(500).json({ message: 'Something went wrong' });
        }
        return res.status(200).json({ message: 'User created' });
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Something went wrong' });
        } else if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Something went wrong' });
            } else if (!isMatch) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET);
            return res.status(200).json({ message: 'Authorized', token });
        });
    });
});

router.post('/auth', (req, res) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Something went wrong' });
        } else if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET);
        res.json({ message: 'Authorized', token });

    })(req, res);

})

export default router;