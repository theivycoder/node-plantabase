import User from "../models/user.model.js";
import passport from "passport";
import passportJWT from "passport-jwt";
import dotenv from "dotenv";
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

var params = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
};

const authProcess = function() {
    var strategy = new JWTStrategy(params, function(payload, done) {
        User.findById(payload.id, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        }
    )});

    passport.use(strategy);

    return {
        initialize: function() {
            return passport.initialize();
        }
    };
}

export default authProcess;