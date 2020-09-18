//whenever we want a private route we can simply add this piece of middleware in the second parameter in the endpoints

const config = require('config');
const jwt = require('jsonwebtoken');


//the purpose of this function here is to get the token thats sent from either react or postman whetever frontend u r using where its gonna send along a token
//so lets create a variable called token and we want to fetch that from the header so the header values are in requests and we r gonna send it in X-authe-token so thats the 
//header value we want to check for the token
//status 401 says that the user is unauthorized
function auth(req, res, next)
{
    const token = req.header('x-auth-token');

    //check for token
    if(!token) 
    {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    
    }
    try
    { 
    //verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    //now we want to take the user from the token because remember we set the ID its sending the user ID and we want to put that into the request.user
    //so that way whenever the token is sent we have that user stored in the request value
    
    //ADD USER FROM PAYLOAD
    req.user = decoded;
    next();
    }

    catch(e) 
    {
        res.status(400).json({ msg : 'Token is not valid' });
    }

}


module.exports = auth;




