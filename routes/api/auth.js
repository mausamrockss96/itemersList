const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config')
const jwt = require('jsonwebtoken');


const auth = require('../../middleware/auth');


//Item Model

const User = require('../../models/User');



// @route   POST  api/auth
// @desc    Auth user
// @access   Public


router.post('/', (req, res) => { 
    const { email, password } = req.body;

    //SIMPLE VALIDATION
    if( !email || !password)
    {
        return res.status(400).json({
            msg: 'Please enter all the fields'
        });
    }

    //checks for existing user
    User.findOne({ email })
    .then(user => {
        if(!user) 
        {
             return res.status(400).json({ msg: ' User doesnot exists '});
        }
     //instead of generating the hash here ,we need to actually compare the plaintext password thats sent with the body request to the hashed password in the database which 
     //comes from here user above
    
     //validating the password
     bcrypt.compare(password, user.password)
     .then(isMatch => {
         if(!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });
        
        //Again here we are signing the token , we are passing in the user ID as a payload, we fetch the user here so we r passing the id and then we get our secrets its going to 
        //expire in an hour and then we have our callback and then we send a response with a token and the user 
         jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
                if(err) throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                })
            }
        )

     })
        
    })

});

// @route   GET api/auth/user
// @desc    Get user data
// @access   Private


//we are in the auth file itself so we just have to do /user , we want it to be protected so we will add the off middleware
//we r going to take our user model, we r going to call find by ID and we just need to pass in the ID now we can get that by doing request.user.id
//i dont want the password to return, so .select('-password')
//it will give the response and we want to it will give us promise with the user and then we want to just send that user and it will minus the password
//and hence it will validate the user with the token

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
});
 

 
// export default router;        its in es6 format but we arent using any of the babel or webpacks

module.exports = router;