const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config')
const jwt = require('jsonwebtoken');


//Item Model

const User = require('../../models/User');

router.post('/', (req, res) => { 
    const { name, email, password } = req.body;

    //SIMPLE VALIDATION
    if(!name || !email || !password)
    {
        return res.status(400).json({
            msg: 'Please enter all the fields'
        });
    }
 
    //checks for existing user
    User.findOne({ email })
    .then(user => {
        if(user) return res.status(400).json({ msg: ' User already exists '});

        const newUser = new User({
            name,
            email,
            password
        });

        //Create salt and hash
        //here 10 is the no of rounds we want to use the higher the more sercure but it also takes longer the default is 10 
        //once we get the salt we can call bcrypt.hash and its gonna take plaintext password which is newUser.password and it takes salt that was generated sowe will pass that in 
        //and then a callback with possible err and hash and now plaintext be saved as hash
        //since this is basically a restAPI we want to just send a reponse back ultimately we r going to generate a token here and send the token and the user but for now we r just
        //gonna send the user so res.json......
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err,hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                .then((user) => {

                    //we want to sign the token, first parameter is gonna be the payload that  we want to add and this could be anything that we want, here we kept user id
                    //when we send the token from react or from postman wherever its coming from, the userID is already hthere so that it know which user it is, otherwise any token 
                    //can access anything, so u send that id andu verify it to do certain things so thats the payload
                    //next parameter is config and another expire is optional 3600sec = 1 hour
                    //another is async callback, sending token to res.json too
                    //so once we register not only it will give us the user back it should give us a token so that we can then authenticate private routes which we havent set up yet

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
        })
    })

});





 

 
// export default router;        its in es6 format but we arent using any of the babel or webpacks

module.exports = router;