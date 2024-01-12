require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const passport = require("passport");
const cookiesession = require("cookie-session");
const authRoute = require("./routes/auth");

const passportSetup = require("./passport/passport");

const app = express();

app.use(cookiesession({
    name: 'session',
    maxAge: 24*60*60*1000,
    keys: [process.env.COOKIE_KEY || "invoiceapp"]
}))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use("/auth",authRoute);



const port = process.env.PORT || 5000;

app.listen( port ,()=>{
    console.log("Server started at port 5000");
})


