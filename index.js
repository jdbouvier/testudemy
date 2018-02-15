const express = require('express');
const passport = require('passport');
const keys = require('./config/keys');

require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

/*
app.get('/', (req, res) => {
  res.send({bonjour: 'JD'});
})
*/

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server started');
});
