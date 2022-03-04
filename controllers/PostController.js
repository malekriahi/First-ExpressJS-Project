const res = require('express/lib/response');
const Post = require('../model/Post');



const AllPost = async (req,res) => {
    const posts = await Post.find();
    if(!posts) return res.status(404).json({'message' : 'No post founded.'});
    res.json(posts);
}

const CreatePost = async (req,res) =>{
    if(!req?.body?.titre || !req?.body?.text){
        return res.status(400).json({'message' : 'All fields are required.'});
    }
    try{
        const result = await Post.create({
            titre : req.body.titre,
            text : req.body.text
        });
        res.status(201).json(result);
    }catch(err)
    {
        console.log(err);
    }
}

const UpdatePost = async (req,res) =>{
    if(!req?.body?.id) return res.status(400).json({'message' : 'ID is required.'});
    const post = await Post.findOne({_id : req.body.id}).exec();
    if(!post) return res.status(204).json({'message' : `No Post match ${req.body.id}.`});
    if(req.body.titre) post.titre = req.body.titre; 
    if(req.body.text) post.text = req.body.text; 
    const result = await post.save();
    res.json(result);
}

const DeletePost = async (req,res) =>{
    if(!req?.body?.id) return res.status(400).json({'message' : 'ID is required.'});
    const post = await Post.findOne({_id : req.body.id}).exec();
    if(!post) return res.status(204).json({'message' : `No Post match ${req.body.id}.`});
    const result = await Post.deleteOne({_id : req.body.id});
    res.status(204).json(result);
}


const GetPost = async (req,res) =>{
    if(!req?.params?.id) return res.status(400).json({'message' : 'ID required'});
    const post = await Post.findOne({ _id : req.params.id}).exec();
    if(!post) return res.status(204).json({'message' : 'No Post matches'});
    res.status(200).json(post);
}


module.exports = { AllPost , CreatePost , UpdatePost , DeletePost , GetPost};