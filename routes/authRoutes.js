const express = require('express');
const passport = require('passport');

const router = express.Router();

// GitHub login
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback
router.get('/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/api-docs');
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.send('Logged out successfully');
    });
  });
});

// Whoami
router.get('/whoami', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
});

module.exports = router;
