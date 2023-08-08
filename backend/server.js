const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;
const codes = require("./data/codes.js");


app.get("/", (req, res)=>{
    res.send("app running");
});

app.get("/api/codes", (req, res)=>{
    res.json(codes);
});

app.get("/api/codes/:id", (req, res) =>{
    const code = codes.find((n)=> n._id === req.params.id);
    res.send(code);
});

app.listen(port , ()=>{
    console.log(`server running at port ${port}`);
});