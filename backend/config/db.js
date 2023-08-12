const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        const key = process.env.MONGO_URI;
        console.log(key);
        const conn = await mongoose.connect( key , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`mongodb connected to host: ${conn.connection.host}`)
    }catch(err){
        console.error(`Error: ${err}`);
        process.exit();
    }
};

module.exports = connectDB;