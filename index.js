const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ========================= */
/* CONFIG */
/* ========================= */

const SMTP_EMAIL = "9f2462001@smtp-brevo.com";
const SMTP_PASSWORD = "s1cSLOD0xHz7GAF2";

const APP_NAME = "Appnetick";

/* ========================= */
/* ROOT */
/* ========================= */

app.get("/", (req, res) => {
res.send("SMTP Server Running");
});

/* ========================= */
/* SEND OTP */
/* ========================= */

app.get("/send-otp", async (req, res) => {

const email = req.query.email;

if(!email){
return res.json({
status:"error",
msg:"Email missing"
});
}

const otp = Math.floor(100000 + Math.random() * 900000);

try {

const transporter = nodemailer.createTransport({

host: "smtp-relay.brevo.com",
port: 587,
secure: false,

auth: {
user: SMTP_EMAIL,
pass: SMTP_PASSWORD
}

});

await transporter.sendMail({

from: `"${APP_NAME}" <${SMTP_EMAIL}>`,
to: email,
subject: "Appnetick OTP Verification",

html: `
<div style="font-family:Arial;padding:20px">
<h2>${APP_NAME}</h2>
<p>Your OTP is:</p>
<h1 style="font-size:40px;color:#4A90E2">${otp}</h1>
<p>This OTP valid for 5 minutes</p>
</div>
`

});

res.json({
status:"success",
otp: otp
});

} catch (e){

res.json({
status:"error",
msg: e.toString()
});

}

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log("Server Running");
});
