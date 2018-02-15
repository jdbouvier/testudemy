const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = require('../models/User');


passport.serializeUser((user, done) => {
    console.log('serialize');
    done(null, user.googleId);
});

passport.deserializeUser((id, done) => {
   User.findOne({googleId: id})
       .then(user => {
           done(null, user)
       })
});

passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refresToken, profile, done) => {
        console.log('Access token', accessToken);
        console.log('Refresh token', refresToken);
        console.log('Profile', profile);

        User.findOne({ googleId: profile.id }).then(existingUser => {
            if(existingUser) {
                done(null, existingUser);
            }
            else {
                new User({ googleId: profile.id }).save().then(user => done(null, user));
            }
        });

    }
    )
);

