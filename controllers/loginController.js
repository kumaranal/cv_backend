const User = require("../models/loginModel")

const jwtfn = require("../middlewares/jwtauthcode");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var validator = require("email-validator");
const TokenShema = require("../models/token");
const mailsent = require("../middlewares/mailsent");
const crypto = require("crypto")
const { TokenExpiredError } = require("jsonwebtoken");
const demo=require("../middlewares/demo");
const nodemailer=require("nodemailer")

require('dotenv').config();

const JWTCODE = process.env.JWTCODE;


const getalluserfn = async (req, res) => {
    User.find()
        .then((data) => {
            console.log(data);
            return res.status(200).json({ msg: "SUCCESS", data: data })
        })
        .catch((err) => {
            console.log(err)
            return res.status(400).json({ msg: "Fail" })
        })
};

const deleteuserfn = (req, res, next) => {
    User.findByIdAndDelete(req.body.id)
        .then(data => {
           return res.status(200).json({ msg: "Success" });

        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ msg: "Fail" });

        })

};

const registrationfn = async (req, res, next) => {
    console.log("req", req.body)
    try {
        // if(req.body.password != req.body.confirm_password){
        //     return res.status(400).json({ msg:"Fail", cause:"confirm_password not matched" });
        // }
        const value = validator.validate(req.body.email);
        if (!value) {
            return res.status(400).json({msg:"Fail", cause: "EMAIL is INVALID" });
        }
        let userexist = await User.findOne({ email: req.body.email });
        if (userexist) {
            return res.status(400).json({msg:"Fail", cause: "email already exist" });
        }
        /////// main registration fn ////////
        let userDATA = {};
        for (const [key, value] of Object.entries(req.body)) {
            if (value == null || value == "") {
                return res.status(400).json({msg:"Fail", cause: `${key} value is INVALID` });
            }
            userDATA[key] = value
        }
        userDATA["userId"] = userDATA.email;

        ////////
        User.create(userDATA)
            .then(result => {
                console.log("data", result);
                let token=crypto.randomBytes(32).toString("hex")
                
                  const url=`${process.env.BASE_URL}/users/${result._id}/verify/${token}`;
                  console.log("mailsent",url)
                    // demo("req"); 
                    // mailsent(result.userId,"verify email",url); 

                /////////////////////////////////////////////////////////////////////
             
                ///////////////////////////////////////////////////////////////////////////
                flag = true;
                {
                    const data = {
                        newuser: {
                            _id: result._id
                        }
                    }

                    const authtoken = jwt.sign({ data }, JWTCODE);
                    return res.status(200).json({ msg: "Success", token: authtoken });
                }
            })
            .catch(err => {
                console.log(err);
                return res.status(400).json({ msg: "Fail" });

            })
        
     
        ////////
    } catch (err) {
        return res.status(500).json({ msg: "failes due to error occure" });
        console.log(err);
    }

}

const loginfn = async (req, res, next) => {
    try {
        let userDATA = {};
        for (const [key, value] of Object.entries(req.body)) {
            if (value == null || value == "") {
                return res.status(400).json({ msg: "Fail" ,cause: `${key} value is INVALID` });
            }
            if (key == 'name' || key == 'email') {
                userDATA[key] = value.toUpperCase();
            }
            else {
                userDATA[key] = value
            }

        }
        const username = await User.findOne({ name: userDATA.name });
        const isMatch = await bcrypt.compare(userDATA.password, username.password);
        if (isMatch) {
            const data = {
                username: {
                    _id: username._id
                }
            }
            // const authtoken = jwt.sign(data, JWTCODE, { expiresIn: "1h" }); ///expire in 1 hour
            const authtoken = jwt.sign(data, JWTCODE); ///expire in 1 hour
            res.status(200).json({ msg: "Success", token: authtoken });
        }
        else {
            res.status(400).json({msg: "Fail", cause: "invalid login credentials" });

        }
    } catch (err) {
        res.status(500).json({msg: "Fail", cause: "internal problem" });
        console.log(err);
    }
}

const logincheck = async (req, res, next) => {
    try{
        let user1;
        user1=await user.findOne({_id:req.params.id});
        if(!user)return res.status(400).send({message:"invaild link"});

        const token= TokenShema.find({
            userId:user._id,
            token:req.params.token
        });
        console.log("token",token)
        if(!token)return res.status(400).send({message:"invalid link"});

        await user.updateOne({_id:user._id,verified:true})
        ////keramoti dekhau
        TokenShema.deleteOne();
        res.status(200).send({message:"email verified success"})
    }catch(err){
        res.status(200).send({message:"email verified unsuccessfull "})
        console.log(err);
    }
};


module.exports = { loginfn, registrationfn, getalluserfn, deleteuserfn, logincheck };