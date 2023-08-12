const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const codes = require("./data/codes.js");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const codeRoutes = require("./routes/codeRoutes.js");
const {notFound, errorHandler} = require("./middlewares/errorMiddleware.js");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
connectDB();
app.use(express.json());

// app.get("/api/codes", (req, res)=>{
//     res.json(codes);
// });

// app.get("/api/codes/:id", (req, res) =>{
//     const code = codes.find((n)=> n._id === req.params.id);
//     res.send(code);
// });

app.use("/api/users", userRoutes);
app.use("/api/codes", codeRoutes);

//----------------------------------------------------Deployment----------------------------------------------------


const __dirnm = path.resolve();

if(process.env.NODE_ENV === "production"){

    app.use(express.static(path.join(__dirnm, "/frontend/build")));

    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirnm, "frontend", "build", "index.html"));
    });

}else{
    app.get("/", (req, res)=>{
        res.send("app running");
    });
}

//----------------------------------------------------Deployment----------------------------------------------------

app.use(notFound);
app.use(errorHandler);

app.listen(port , ()=>{
    console.log(`server running at port ${port}`);
});