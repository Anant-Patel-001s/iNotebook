const mongoose = require('mongoose');

// const mongoURI = "mongodb+srv://practice:t7BB6F7bR6ETbfox@cluster0.hbz3kwn.mongodb.net/practice"
const mongoURI = "mongodb+srv://test:zi8Xt1TgEHGBCaDa@cluster0.tsdpu0j.mongodb.net/test"
// const mongoURI ="mongodb://localhost:27017/inotebook?directConnection=true"
const connectToMongo = () => {
    mongoose.connect(mongoURI, (err) => {
        if(err) console.log(err) 
        else console.log("mongdb is connected");
       }
    )
}

module.exports = connectToMongo;