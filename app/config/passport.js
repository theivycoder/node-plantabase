import passportJwt from 'passport-jwt';
import User from '../models/user';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const strategy = new JwtStrategy(jwtOptions, (payload, next) => {
    User.findById(payload.sub, (err, user) => {
        if (err) {
            return next(err, false);
        }
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });
});

export default strategy;