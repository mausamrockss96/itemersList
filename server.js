const express = require('express');
const mongoose = require("mongoose");
const app = express();
// const bodyParser = require("body-parser");
const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const cors = require('cors');







const path = require('path');
const config = require('config');



//BodyParser Middleware
// app.use(bodyParser.json());    //instead of this express.json
app.use(express.json());

//Database configuration
// const db = require('./config/keys').mongoURI;
const db = config.get('mongoURI')

//connect to mongo
// mongoose.
// connect(db)
// .then(() => console.log('MongoDB connected....'))
// .catch(err => console.log(err));


mongoose.
connect(db, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true

})  //Adding new mongo Url Parser
.then(() => console.log('MongoDB connected....'))
.catch(err => console.log(err));




//use routes
// app.use('/api/items',require('./routes/api/items'));    //easy way no need to update above

app.use('/api/items',items);
app.use('/api/users',users);
app.use('/api/auth',auth);
//OR
// app.use('/api/users', require('./routes/api/users'));
// app.use('/api/auth', require('./routes/api/auth'));
app.use(cors());    




//serve the static assets if in production
if (process.env.NODE_ENV === 'production')
{
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
    });
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));
