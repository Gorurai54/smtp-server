const express = require("express");

const app = express();

// Root route
app.get("/", (req, res) => {
  res.send("SMTP Server Running");
});

// Test route
app.get("/send-otp", (req, res) => {
  res.send("OTP Route Working");
});

// Important for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
