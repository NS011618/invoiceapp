require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const cors = require("cors");


const app = express();

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

const User = require("./models/userModel");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google-callback/",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = new User({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          // Add other fields as needed
        });

        await newUser.save();

        return done(null, newUser);
      } catch (error) {
        console.error("Error in Google strategy callback:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // Serialize user data
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  // Deserialize user data
  done(null, obj);
});


//Login Functionality

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google-callback/",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:3000/profile");
    console.log("Login Successful");
  }
);

app.get("/auth/user", (req, res) => {
  // Sending the authenticated user data to the client
  const user = req.user;
  res.json({ user: user });
});



// Route to fetch SaaS usage details
app.get('/api/usage/:userId', async(req, res) => {
  const userId = req.params.userId;
  const userCount = await User.countDocuments();  
  
  const estimatedDocumentCount = await User.estimatedDocumentCount();

  // Calculate size based on an average document size (adjust the value based on your schema)
  const averageDocumentSize = 36; 
  const collectionSize = estimatedDocumentCount * averageDocumentSize;

  const saasUsageData = {
    totalUsers: userCount,
    storageUsage: collectionSize,  // Use the calculated size
  };
  res.json({ saasdata: saasUsageData });
  console.log('Usage data sent successfully');
  console.log(userId);
});



//Logout Functionality
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("http://localhost:3000/");
}

app.get("/auth/logout", ensureAuthenticated, (req, res) => {
  req.logout();
  res.json({ message: "Logging out" });

  console.log("logged out successfully");
});





//Running the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
