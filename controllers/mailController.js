const nodemailer=require('nodemailer');
require('dotenv').config();


const sendMail=(req,res)=>{
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:"karthikaselvam291099@gmail.com",
            pass:`${process.env.PASSWORD}`
        }
    });

    const mailData={
        from:'karthikaselvam291099@gmail.com',
        to:'info@redpositive.in',
        subject:'Data sent from internship project - Karthika Selvam',
        html:`<h3>${JSON.stringify(req.body.data)}</h3>`
    };
    transporter.sendMail(mailData,(err,info)=>{
        if(err){
            console.log(err);
            res.status(400).json({error:"Sending failed"})
        }
        else{
            res.status(200).json(info.response)
        }
    });
}
module.exports=sendMail;
