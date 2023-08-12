const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const connectDB = async()=>{
    try{
        console.log(process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongodb connected to host: ${conn.connection.host}`)
    }catch(err){
        console.error(`Error: ${err}`);
        process.exit();
    }
};

module.exports = connectDB;