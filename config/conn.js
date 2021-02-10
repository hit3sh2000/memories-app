// connecting to database

const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://dbuser:dbuser@cluster0.uaxdw.mongodb.net/capstone?retryWrites=true&w=majority",{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connection is sucessful"))
.catch((err) => console.log("NO connection",err))   