const express = require("express");

const app = express();

app.get("/", (req, res) => {
res.send("Server Running");
});

app.get("/send-otp", (req, res) => {
res.send("OTP Working");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log("Server running");
});
