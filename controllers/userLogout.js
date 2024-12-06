 const userModel = require("../models/userSchema");

exports.userLogout=async (req,res) =>{
    try{
        res.clearCookie("token")

        res.json({
             message : "Logged out successfully",
             error : false,
             success : true,
            data : []
        })
    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
             success : false,
        })
    }
 }


