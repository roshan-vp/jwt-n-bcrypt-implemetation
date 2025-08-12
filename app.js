require('dotenv').config();

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require('path');
const userModel = require("./models/user");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const JWT_SECRET = process.env.SECRET;

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.post("/signup", async (req, res) => {
    try {
        let { email, username, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if(existingUser) {
            return res.status(409).send("User with this email already exists")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let createdUser = await userModel.create({
            email,
            username,
            password: hashedPassword,
        })

        let token = jwt.sign({email}, JWT_SECRET, {expiresIn: "1h"});
        res.cookie("token", token, {httpOnly: true});

        res.redirect("/")
    } catch(error) {
        console.log(error);
        res.status(500).render("error");
    }
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/login", async (req, res) => {
    try {
        let user = await userModel.findOne({username: req.body.username});

        if(!user) {
            return res.render("error");
        }

        isMatch = await bcrypt.compare(req.body.password, user.password);
        if(isMatch) {
            let token = jwt.sign({email: user.email}, JWT_SECRET, {expiresIn: "1h"});
            res.cookie("token", token, {httpOnly: true});
            res.redirect('/')
        } else {
            res.status(401).send("Invalid email or password");
        }
    } catch(error) {
        console.log(error);
        res.status(500).render("error");
    }
})

app.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.redirect('/');
})

app.listen(5050, () => {
    console.log("port is listening to 5050");
})