const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* CONFIG */

const SMTP_EMAIL = "goru78.nex@gmail.com";
const SMTP_PASSWORD = "mjtlqbdyrxsakuhn";

const APP_NAME = "Appnetick";

/* ROOT */

app.get("/", (req, res) => {
res.send("SMTP Server Running");
});

/* SEND OTP */

app.get("/send-otp", async (req, res) => {

const email = req.query.email;

if(!email){
return res.json({status:"error",msg:"Email missing"});
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
subject: "OTP Verification",

html: `
<h2>${APP_NAME}</h2>
<p>Your OTP:</p>
<h1>${otp}</h1>
<p>This OTP valid for 5 minutes</p>
`

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log("Server running");
});
