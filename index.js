const express = require('express');
const connectDB = require('./config/db');
const app = express();

// // Connect to MongoDB
connectDB();

// // Middleware
// app.use(express.json());

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/tasks', require('./routes/taskRoutes'));

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
