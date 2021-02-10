const express=require('express');
const app=express();
const bodyParser=require('body-parser')
require('./config/conn');
const port =process.env.PORT || 3001

app.use(bodyParser.json({limit: '30mb',extended:false}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.get('/',(req,res)=>{
    res.send("welcome");
})

app.use('/api/users',require('./routes/user'));
app.use('/api/auth',require('./routes/login'));
app.use('/api/image',require('./routes/image'))
app.use('/api/posts',require('./routes/postmessage'))

app.listen(port,()=>{
    console.log(`server running at port no:${port}`);
})