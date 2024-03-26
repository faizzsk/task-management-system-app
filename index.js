require('dotenv').config(); // 
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const loggingMiddleware = require("./middleware/logging.middleware");
const errorHandler = require("./middleware/error.middleware");

const app = express();

// // Connect to MongoDB
connectDB();

// // Middleware
app.use(express.json());
app.use(cookieParser());
app.use(loggingMiddleware);
app.use(errorHandler);


// // Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/tasks", require("./routes/task.routes"));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


module.exports = app;
