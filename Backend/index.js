const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const cors = require('cors');
const app = express();

// Replace 'YOUR_GOOGLE_CLIENT_ID' and 'YOUR_GOOGLE_CLIENT_SECRET' with your actual values.
const GOOGLE_CLIENT_ID = '599000675886-mlev0o0kg0p0l5g6g9mhb2kc3vgss5c7.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

mongoose.connect('mongodb+srv://ashishgolla2003:NS011618@cluster0.ophbpqo.mongodb.net/invoiceapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  session({
    secret:'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

const User = require('./models/userModel');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


app.use(passport.initialize());
app.use(passport.session());



passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google-callback/',
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
        console.error('Error in Google strategy callback:', error);
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




app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google-callback/',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3000/profile');
    console.log('Login Successful')
  }
);

app.get('/auth/user', (req, res) => {
  // Send the authenticated user data to the client
  const user = req.user;
  res.json({ user: user });

  
});



app.get('/profile', (req, res) => {
  // Access the authenticated user via req.user
  const user = req.user;
  res.json({ user: user });
  
});



function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('http://localhost:3000/');
}

app.get('/auth/logout', ensureAuthenticated, (req, res) => {
  req.logout();
  res.json({ message: 'Logging out' });
  
  console.log('logged out successfully')

});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
