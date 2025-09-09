// server.js
// Entry point for Task Management App backend

const express = require ("express");
const cors = require ("cors")
const dotenv = require("dotenv")
const { connectDB } = require("./config/db");
// Load environment variables
dotenv.config();


const app = express();

// Middleware
app.use(cors());  // Allow frontend requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({extended:true})); // Parse the url's

//Testing route
app.get('/api/health',(req,res)=>{
    res.json({message:"API is running 🚀"})
})

app.get("/api/db-test", async (req, res) => {
  try {
    console.log("Hi------------")
    const pool = await connectDB(); // Get DB connection
    const result = await pool.request().query("SELECT GETDATE() AS currentTime");
    res.json({
      message: "✅ Database query successful",
      currentTime: result.recordset[0].currentTime,
    });
  } catch (error) {
    console.error("❌ DB Test Failed:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// //Import routes
// const authRoutes = require("./routes/authRoutes");
// const projectRoutes = require("./routes/projectRoutes");
// const taskRoutes = require("./routes/taskRoutes")

// //binding the routes with express.
// app.use('/api/auth', authRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/tasks', taskRoutes);

// Error handling middleware.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong" });
});

//Server Starts 
const PORT = process.env.PORT || 5000; // Fetching the port number from the env.
app.listen(PORT,()=>{
    console.log(`Server is running in the port ${PORT}`)
});


