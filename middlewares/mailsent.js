const nodemailer=require("nodemailer")
require('dotenv').config();



const mailsentfn=async(email,subject,text)=>{
    // console.log("value",email)
    try{
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
                user: process.env.MAILSENTUSER,
                pass: process.env.MAILSENTPASS   //./app password in gmail settings
            }
            });


        let info = await transporter.sendMail({
            from: `"AK" <${process.env.MAILSENTUSER}>`, // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: `<b>${text}</b>`, // html body
          });
    
          console.log("Message sent: %s", info.messageId);
          res.json(info)
    }
    catch(err){
        console.log(err);
        console.log("Message not sent");

    }
}
module.export=mailsentfn;