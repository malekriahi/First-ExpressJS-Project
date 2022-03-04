const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { firstname ,lastname , username , email, password } = req.body;
    if (!firstname || !lastname || !username || !email || !password) return res.status(400).json({ 'message': 'all fields are required.' });
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({email : email}).exec() ;
    if (duplicate) return res.status(409).json({ 'message': 'User already exist.' }); //Conflict 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);
        //store the new user
        const result = await User.create({
            "firstname": firstname,
            "lastname": lastname,
            "username": username, 
            "email": email,
            "password": hashedPwd 
        });
        
        console.log(result);

        res.status(201).json({ 'success': `New user ${username} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const Login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = await User.findOne({email : email}).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN,
            { expiresIn: '1d' }
        );
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}


module.exports = { register , Login };