const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

connectToDb();

// Updated CORS configuration with your specific forwarded port
const corsOptions = {
  origin: ['http://localhost:5173', 'https://s27q52kn-5173.inc1.devtunnels.ms'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello, world');
});

app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides',rideRoutes);

module.exports = app;