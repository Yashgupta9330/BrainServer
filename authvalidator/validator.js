const {z}= require("zod");

// Define the Zod schema for user signup data
exports.SignupSchema = z.object({
    firstName: z.optional(z.string().trim().min(0, { message: "First name cannot be empty" }).max(50, { message: "First name cannot exceed 50 characters" })),
    lastName: z.optional(z.string().trim().min(0, { message: "Last name cannot be empty" }).max(50, { message: "Last name cannot exceed 50 characters" })),
    userName: z.string({required_error:"Username is required"}).trim().min(3, { message: "Username must be at least 3 characters long" }).max(50, { message: "Username cannot exceed 50 characters" }),
    email: z.string({required_error:"Email is required"}).trim().email({ message: "Invalid email format" }),
    password: z.string({required_error:"Password is required"}).trim().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string({required_error:"Confirm password is required"}).trim().min(8, { message: "Password must be at least 8 characters long" }),
    image: z.optional(z.string()),
    otp: z.string({required_error:"OTP is required"}).trim().length(6, { message: "OTP must be 6 characters long" }).regex(/^\d+$/, { message: "OTP must contain only digits" }),
  });
  


exports.LoginSchema = z.object({
  email: z.string({required_error:"Email is required"}).trim().email({ message: "Invalid email format" }),
  password: z.string({required_error:"Password is required"}).trim().min(8, { message: "Password must be at least 8 characters long" })
})

exports.OtpSchema = z.object({
  email: z.string({required_error:"Email is required"}).trim().email({ message: "Invalid email format" }),
})


exports.resetSchema =  z.object({
  email: z.string({required_error:"Email is required"}).trim().email({ message: "Invalid email format" }),
})


exports.resSchema =  z.object({
  password: z.string({required_error:"Password is required"}).trim().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string({required_error:"Confirm password is required"}).trim().min(8, { message: "Password must be at least 8 characters long" }),
  token:z.string({required_error:"Token is required"}).trim()
})
