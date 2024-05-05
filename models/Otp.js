const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
	// Send the email
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
            `Hi ${otp},\n\nThis is the Otp for your Verification Email.`,
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

// Define a pre-save hook to send email before the document has been saved
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");
	await sendVerificationEmail(this.email, this.otp);
	   next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;