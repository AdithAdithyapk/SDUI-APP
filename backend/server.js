// Create server.js file
const express = require("express");
const cors = require("cors");
const loginRoute = require("./routes/login");
// const dashboardRoute = require("./routes/dashboard");
// const settingsRoute = require("./routes/settings");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/login-ui", loginRoute);
// app.use("/dashboard-ui", dashboardRoute);
// app.use("/settings-ui", settingsRoute);

app.post("/authenticate", (req, res) => {
    console.log("req.body",req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    console.log("req body----->",req.body, email, password)
    if (email === "admin" && password === "123") {
        return res.json({ success: true, message: "Login Successful", redirect: "/dashboard" });
    }
    return res.status(401).json({ success: false, message: "Invalid credentials" });
});

app.post("/signup", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    return res.json({ success: true, message: "Account created successfully!", redirect: "/dashboard" });
});

app.listen(4000, () => console.log("Server running on port 4000"));