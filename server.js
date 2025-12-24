const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const teacherRoutes = require("./routes/teacher");
const attendanceRoutes = require("./routes/attendance");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// 🔴 THIS LINE WAS MISSING (VERY IMPORTANT)
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Routes
app.use("/teacher", teacherRoutes);
app.use("/attendance", attendanceRoutes);

// Start server
app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});