app.post("/send-otp", async (req, res) => {

const email = req.body.email;

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
