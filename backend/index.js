const express = require("express")
const mongoose = require("mongoose")
const router = require("./routes/userRoutes")
const blogRouter = require('./routes/blogRoutes');
const app = express();
app.use(express.json())
app.use("/api/user", router);
app.use("/api/blogs", blogRouter)

const uri = "mongodb+srv://sravankamineni41100:FV8JTmT7aBgiuH2h@cluster0.mribnho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
    .then(() => app.listen(5000))
    .then(() => console.log("Connected"))
    .catch(() => console.log("Error"))

