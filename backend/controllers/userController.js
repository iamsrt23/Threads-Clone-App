import bcrypt from "bcryptjs/dist/bcrypt.js"
import User from "../models/userModel.js"
import generateTokenAndsetCookies from "../utils/helpers/generateTokenAndSetCookie.js"

const signupUser = async(req,res) =>{
    try {
        const {name,username,password,email} = req.body
        const user = await User.findOne({$or:[{email},{username}]})

        if(user){
            return res.status(400).json({message:"user already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new User({
            name,
            username,
            email,
            password:hashedPassword

        })

        await newUser.save()

        if(newUser){
            
            generateTokenAndsetCookies(newUser._id,res) //we are passing response inside this we response the cookie
            res.status(200).json({
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                username:newUser.username,
            })
        }else{
            res.status(400).json({message:"Invaild User data"})
        }

    } catch (error) {
        res.status(500).json({message:error.message})

        console.log("Error in signUp user:",error.message)
        
    }
}



const loginUser = async(req,res)=>{

   try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "")

        if(!user || !isPasswordCorrect){
            return res.status(400).json({message:"Invalid username or Password"})

        }
        generateTokenAndsetCookies(user._id,res)
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            username:user.username
        })
    
   } catch (error) {
    res.status(500).json({message:error.message})
    console.log("Error in Login User",error.message)

    
   }

}


const logoutUser = async(req,res)=>{

    try {
        res.cookie("jwt","",{maxAge:1})
        res.status(200).json({message:"user logout successfully"})
        
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log(("Error in Browser",error.message))
    }


}

const followUnFollowUser = async(req,res)=>{

    try {

        const {id} = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id)

        if(id.toString() === req.user._id.toString()){
            return res.status(400).json({message:"You cannot follow/unfollow yourself"})
        }
        if(!userToModify || !currentUser){
            return res.status(400).json({message:"User Not Found"})
        }

        const isFollowing = currentUser.following.includes(id);

        if(isFollowing){
            // unfollowUser
            // Modify currentuser following, modify followers of userToModify

            
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });   
            res.status(200).json({message:"User unfllowed successfully"})
        }else{
            // Follow user
            await User.findByIdAndUpdate(id,{$push:{followers:req.user._id}})
            await User.findByIdAndUpdate(req.user._id,{$push:{following:id}})
         
            res.status(200).json({message:"User followed successfully"})
            
        }
        
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log(("Error in Follow un Follow User",error.message))
 
    }

}

export {signupUser,loginUser,logoutUser,followUnFollowUser}