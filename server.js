require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const  {connectDB } = require('./config/dbConn');
const PORT = 3500;
const bodyparser = require('body-parser');
const verifyJWT = require('./middleware/verifyJWT');
const cors = require('cors');



app.use(cors({credentials: true, origin: true}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.json());

connectDB();
app.use('/register', require('./routes/register'));
app.use('/auth',require('./routes/auth'));

app.use(verifyJWT);
app.use('/posts' , require('./routes/post'));


mongoose.connection.once('open', ()=>{
    console.log('connected to mongodb');
    app.listen(PORT, ()=> {console.log(`server is running on port ${PORT}`)});
});
