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

host: "smtp.gmail.com",
port: 465,
secure: true,

auth: {
user: SMTP_EMAIL,
pass: SMTP_PASSWORD
},

tls: {
rejectUnauthorized: false
},

connectionTimeout: 20000,
greetingTimeout: 20000,
socketTimeout: 20000

});

await transporter.sendMail({

from: `${APP_NAME} <${SMTP_EMAIL}>`,
to: email,
subject: "OTP Verification",

html: `<h1>${otp}</h1>`

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
