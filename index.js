const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* CONFIGURATION */

const SMTP_EMAIL = "goru78.nex@gmail.com";
const SMTP_PASSWORD = "mjtlqbdyrxsakuhn";

const APP_NAME = "Appnetick";
const EMAIL_SUBJECT = "Appnetick OTP Verification";

app.post("/send-otp", async (req, res) => {

const email = req.body.email;

if(!email){
return res.json({status:"error"});
}

const otp = Math.floor(100000 + Math.random() * 900000);

const transporter = nodemailer.createTransport({
service: "gmail",
auth: {
user: SMTP_EMAIL,
pass: SMTP_PASSWORD
}
});

const mailOptions = {

from: `${APP_NAME} <${SMTP_EMAIL}>`,
to: email,
subject: EMAIL_SUBJECT,

html: `<h1>${otp}</h1>`

};

try{

await transporter.sendMail(mailOptions);

res.json({
status:"success",
otp: otp
});

}catch(e){

res.json({
status:"error",
msg:e.toString()
});

}

});

app.listen(3000);
