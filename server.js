const express = require ("express");
const cors = require ("cors")
const dotenv = require("dotenv")
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes")


// Load environment variables
dotenv.config();


const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({extended:true})); // Parse the url's

// checking purpose
app.use((req,res,next)=>{
    console.log(req.method, req.url)
    next()
})

//binding the auth routes with express.
app.use('/api/auth', authRoutes);

//binding the project routes with the express
app.use("/api/project", projectRoutes)



//Testing route
app.get('/api/health',(req,res)=>{
    res.json({message:"API is running 🚀"})
});

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


