import User from "../models/user.model.js";

// Create a new user
const signup = (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname
    });

    newUser.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the User."
            });
        });
}

export default { signup };