const express = require('express');
const passport = require('passport');
const keys = require('./config/keys');

require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

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
