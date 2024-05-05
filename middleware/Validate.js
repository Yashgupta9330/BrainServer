const z =require("zod");

// Middleware function to validate request body against a given schema
exports.validateSchema = (schema) => async (req,res,next) => {
    try {
      // Validate request body against the provided schema
      const parseBody=await schema.parseAsync(req.body);
      // If validation passes, proceed to the next middleware
      req.body=parseBody;
      next();
    } 
    catch (error) {
        // If validation fails, send back validation errors
        if (error instanceof z.ZodError) {
          const validationErrors = error.errors.map(err => err.message);
          return res.status(400).json({ errors: validationErrors });
        } else {
          // Handle unexpected errors
          console.error("Unexpected error:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
    }
  };



