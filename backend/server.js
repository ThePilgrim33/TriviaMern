const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require('./routes/auth');
const gameRoutes= require('./routes/game');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use('/api', authRoutes);
app.use('/api', gameRoutes);


const listener = app.listen(process.env.PORT || 4000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
  });