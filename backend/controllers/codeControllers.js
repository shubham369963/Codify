const Code = require("../models/codeModel.js");
const asyncHandler = require("express-async-handler");


const getCodes = asyncHandler(async (req, res) => {
    const codes = await Code.find({ user: req.user._id });
    res.json(codes);
  });

const createCode= asyncHandler(async (req, res) =>{
    const {title , content, category} = req.body;

    if(!title || !content || !category){
        res.status(400);
        throw new Error("Please Fill all the Fields ");
    }else{
        const code = new Code({user: req.user._id, title, content, category});

        const createdCode = await code.save();
        
        res.status(201).json(createdCode);
    }
})

const getCodeById = asyncHandler(async (req, res) =>{
    const code = await Code.findById(req.params.id);

    if(code){
        res.json(code);
    }else{
        res.status(404).json({message: "Code Not Found"});
    }
})



const updateCode = asyncHandler(async (req, res) =>{
    const {title, content, category} = req.body;
    const code = await Code.findById(req.params.id);

    if(code.user.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You Can't perform this action")
    }

    if(code){
        code.title = title;
        code.content = content;
        code.category = category;

        const updatedCode = await code.save();
        res.json(updatedCode);
    }else{
        res.status(404);
        throw new Error("Code Not Found");
    }
})



const deleteCode = asyncHandler(async (req, res) =>{

    const code = await Code.findById(req.params.id);

    if(code.user.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You Can't perform this action")
    }

    if(code){
        await code.deleteOne();
        res.json({message: "Code Removed"});
    }else{
        res.status(404);
        throw new Error("Code Not Found");
    }
})

module.exports = {getCodes, createCode, getCodeById, updateCode, deleteCode};