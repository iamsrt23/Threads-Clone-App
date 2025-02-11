import Post from "../models/postModel.js";
import User from "../models/userModel.js";




// Create a post

const createPost = async(req,res) =>{

    try {

        const{postedBy,text,img} = req.body

        if(!postedBy || !text){
            return res.status(400).json({message:"Please fill All the details"})
        }
        const user  = await User.findById(postedBy)
        if(!user){
            return res.status(404).json({message:"User not Found"})
        }

        if(user._id.toString() !== req.user._id.toString()){
            return res.status(401).json({message:"UnAuthorized to create post"})

    
        }

        const maxLength = 500
        if(text.length > maxLength){
            return res.status(400).json({message:`Text must be lessthan ${maxLength} characters`})
        }

        const newPost = new Post({
            postedBy,
            text,
            img
        })

        await newPost.save();

        res.status(201).json({message:"Posted Successfully",newPost})
        
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log(error)
        
    }

}

// to get the Post
const getPosts = async(req,res)=>{

    try {
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(404).json({message:"Post Not found"})
        }

        res.status(200).json({ post })
        

    } catch (error) {
        res.status(500).json({message:error.message})
        console.log(error)
        
    }

}

// To delete the Post
const deletePost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({message:"post not found"})
        }

        if(post.postedBy.toString() !== req.user._id.toString()){
            return res.status(401).json({message:"Un Authorized to delete the post"})
        }
        
        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({message:"Post deleted Successfully"})
        
    } catch (error) {
        res.status({message:error.message})
        console.log(error)
        
    }

}

// To Like and Unlike the Post

const likeUnlikePost = async(req,res)=>{

    try {
        const {id:postId} = req.params
        const userId = req.user._id

        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        // if user liked the post
        const userLikedPost = post.likes.includes(userId)
 
        if(userLikedPost){
            // UnLike the post

            await post.updateOne({_id:postId}, {$pull:{likes: userId}})
            res.status(200).json({message:"Post Unliked Successfully"})

        }else{
            // Like Post

            await post.likes.push(userId)
            await post.save()
            res.status(200).json({message:"Post Liked Successfully"})

        }

        
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log(error)
    }

}



// Reply the Post

const replyToPost = async(req,res)=>{
    try {

        const {text} = req.body
        const {id:postId} = req.params
        const userId = req.user._id
        const userProfilePic = req.user.userProfilePic
        const username = req.user.username

        if(!text){
            return res.status(400).json({message:"Text field is Required"})
        }
        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({message:"Post not Found"})
        }
        const reply = {userId,text,userProfilePic,username}
        post.replies.push(reply)
        await post.save()

        res.status(200).json({message:"Reply Added successfully",post})


        
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log(error)
    }

}


// get feed Posts

const getFeedPosts = async(req,res)=>{
    try {

        const userId = req.user._id
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"User not Found"})
        }

        const following = user.following;

        const feedPosts = await Post.find({postedBy:{$in:{following}}}).sort({createdAt:-1})
        res.status(200).json({feedPosts})

        
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log(error)
        
    }
}

export {createPost,getPosts,deletePost,likeUnlikePost,replyToPost,getFeedPosts}