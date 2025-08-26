const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Credentials = require("./src/models/model");
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;
const URI = process.env.URI.replace('<password>', process.env.PASSWORD);
const PORT = process.env.PORT || 6969;

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

mongoose.connect(URI, { dbName: "InnovationClub" })
  .then(() => console.log('✅ Connected to MongoDB ✅'))
  .catch(err => console.error('❌ MongoDB connection error : ', err));

// Serve static files correctly (no manual headers needed)
app.use(express.static(path.join(__dirname, "../Frontend/public")));

// Routes
const cssRoot = path.join(__dirname, "../Frontend/public/css");
const jsRoot = path.join(__dirname, "../Frontend/public/js");
const pagesRoot = path.join(__dirname, "../Frontend/public/pages");

// CSS
app.get("/style/main", (req, res) =>
  res.sendFile("main.css", { root: cssRoot })
);

// JS
app.get("/js/main", (req, res) =>
  res.sendFile("main.js", { root: jsRoot })
);

// Pages
app.get("/", (req, res) =>
  res.sendFile("login.html", { root: pagesRoot })
);
app.get("/student/dashboard", (req, res) =>
  res.sendFile("studentDashboard.html", { root: pagesRoot })
);
app.get("/faculty/dashboard", (req, res) =>
  res.sendFile("facultyDashboard.html", { root: pagesRoot })
);
app.get("/admin/dashboard", (req, res) =>
  res.sendFile("adminDashboard.html", { root: pagesRoot })
);


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Credentials.find({ email });
    if (user.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    } 
    const token = jwt.sign({ email: user[0].email, role: user[0].role }, SECRET_KEY, { expiresIn: '2h' });
    res.json({ token, role: user[0].role });
  } catch (error) {
    console.error('❌ Login error : ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/validate', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(401);
      res.json({ email: user.email, role: user.role });
    })
  } catch (error) {
    console.error('❌ Token validation error : ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log('✅ Server is running at http://localhost:' + PORT + ' ✅');
});
