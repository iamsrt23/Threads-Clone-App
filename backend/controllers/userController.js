
import bcrypt from "bcryptjs/dist/bcrypt.js"
import User from "../models/userModel.js"
import generateTokenAndsetCookies from "../utils/helpers/generateTokenAndSetCookie.js"


// getuser profile
const getUserProfile = async(req,res)=>{

    const {username} = req.params
    try {

        const user =  await User.findOne({username}).select("-password").select("-updatedAt")
        if(!user){
            return res.status(400).json({message:"User not Found"})

        }
        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log("Error in getUserProfile:",error.message)
        
    }
    
}




// SignUp a New User
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


// Sign in Existing User
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

// Logout the User
const logoutUser = async(req,res)=>{

    try {
        res.cookie("jwt","",{maxAge:1})
        res.status(200).json({message:"user logout successfully"})
        
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log(("Error in Browser",error.message))
    }


}

// follow and unfollow a user
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

// Update the UserProfile
const updateUser = async(req,res)=>{

    const {name,email,username,password,profilePic,bio} = req.body
    const userId = req.user._id
    
    try { 

        let user = await User.findById(userId)
        if(!user){
            return res.status(400).json({message:"User Not Found"})
        }

        if(req.params.id !== userId.toString()){
            return res.status(400).json({message:"You can't Update Other User's Profile"})
        }



        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt)
            user.password=hashedPassword;
        }

        user.name = name || user.name
        user.email = email || user.email
        user.username = username || user.username
        user.profilePic = profilePic || user.profilePic
        user.bio = bio || user.bio

        user = await user.save()
        res.status(200).json({message:"Profile Updated Successfully",user})


        


        
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log("Error in updateUser:", error.message)
        
    }
}




export {signupUser,loginUser,logoutUser,followUnFollowUser,updateUser,getUserProfile}