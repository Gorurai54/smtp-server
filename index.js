const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ========================= */
/* CONFIGURATION */
/* ========================= */

const SMTP_EMAIL = "goru78.nex@gmail.com";
const SMTP_PASSWORD = "mjtlqbdyrxsakuhn";

const APP_NAME = "Appnetick";
const EMAIL_SUBJECT = "Appnetick OTP Verification";


/* ========================= */
/* ROOT TEST ROUTE */
/* ========================= */

app.get("/", (req, res) => {
res.send("SMTP OTP Server Running");
});


/* ========================= */
/* SEND OTP */
/* ========================= */

app.all("/send-otp", async (req, res) => {

const email = req.body.email || req.query.email;

if(!email){
return res.json({
status:"error",
msg:"Email missing"
});
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

html: `

<div style="font-family:Arial;padding:20px">

<h2>${APP_NAME}</h2>

<p>Your OTP Code:</p>

<h1 style="font-size:35px;color:#4A90E2">${otp}</h1>

<p>This OTP is valid for 5 minutes</p>

</div>

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
msg: e.toString()
});

}

});


/* ========================= */
/* SERVER START */
/* ========================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log("SMTP Server Running");
});
