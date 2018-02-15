const cookieSession = require('cookie-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const keys = require('../config/keys');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    })
});

passport.use(
    new GoogleStrategy({
        clientID:keys.googleClientId,
        clientSecret:keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy:true
    }, function(accessToken,refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
        console.log(accessToken);
    })
);