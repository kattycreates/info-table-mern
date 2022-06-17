const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const userRoute=require('./routes/users');
const middleware=require('./utils/middlewares');
const path=require('path');
require('dotenv').config();

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log("connected")).catch(err=>console.log(err));

app.use('/api/users',userRoute);
//app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.use(express.static(path.join(__dirname, "client", "build")))

app.get('/', (req, res, next) => {
    res.sendFile('./public/index.html', { root: __dirname });
});

app.listen(process.env.PORT||5000,()=>console.log(`listening on port ${process.env.PORT||5000}`));