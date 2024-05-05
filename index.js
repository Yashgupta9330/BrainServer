const express = require("express");
const app = express();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");


// Load environment variables
dotenv.config();

// Connect to the database
database.connect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.REACT_APP_BASE_URL // frontend URL
}));

// Import your controller
const { signup, sendotp, login } = require("./controller/Auth");
const { resetPasswordToken, resetPassword } = require("./controller/ResetPassword");
const { SignupSchema, OtpSchema, LoginSchema, resSchema, resetSchema } = require("./authvalidator/validator");
const { validateSchema } = require("./middleware/Validate");
const { post } = require("./controller/Post");
const { auth } = require("./middleware/auth");

// Routes
app.post("/signup",
  validateSchema(SignupSchema),
signup);
app.post("/sendotp",
  validateSchema(OtpSchema)
,sendotp);
app.post("/login",
 validateSchema(LoginSchema)
,login);
// Route for generating a reset password token
app.post("/reset-password-token", 
validateSchema(resetSchema),
resetPasswordToken);

// Route for resetting user's password after verification
app.post("/reset-password", 
validateSchema(resSchema),
resetPassword);

app.post("/getpost",auth,post);


// Default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: 'Your server....'
  });
});



// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
