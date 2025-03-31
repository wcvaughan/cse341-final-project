const dotenv = require('dotenv');
dotenv.config();

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "https://cse341-node-r714.onrender.com/auth/callback"
},
(accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));
