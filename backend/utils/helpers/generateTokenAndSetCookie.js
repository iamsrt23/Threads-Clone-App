import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const generateTokenAndsetCookies = (userId,res)=>{

    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'15d'})

    res.cookie('jwt',token,{
        httpOnly:true, // more secure
        maxAge: 15 * 24 * 60 * 1000 ,// 15 days,
        sameSite: "strict", //CSRF
    })

    return token

}

export default generateTokenAndsetCookies;