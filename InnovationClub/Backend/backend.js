const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
const SECRET_KEY = 'Evarra nuvvu erripukaaaa cjdsncjkdscdcnjnuY&^*^&#EY^&(#Ybudbyiwebd7h7HHW&GF&WEGF&*GFyewbvfhyBHGEfyugewryufgh7w4gfy::::""""';
const URI = 'mongodb+srv://theshahidprofessional:1lD5nVDQkyhgfbuE@manadheidantaah.zkyuf0q.mongodb.net/?retryWrites=true&w=majority&appName=ManadheIdantaah';

app.use(cors());
app.use(express.json());

mongoose.connect(URI)
  .then(() => console.log('✅ Connected to MongoDB ✅'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Serve static files correctly (no manual headers needed)
app.use(express.static(path.join(__dirname, "../Frontend/public")));

// Routes
app.get('/style/main', (req, res) => 
  res.sendFile(path.join(__dirname, '../Frontend/public/css/main.css'))
);
app.get('/js/main', (req, res) => 
  res.sendFile(path.join(__dirname, '../Frontend/public/js/main.js'))
);

app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, '../Frontend/public/pages/login.html'))
);
app.get('/student/dashboard', (req, res) => 
  res.sendFile(path.join(__dirname, '../Frontend/public/pages/studentDashboard.html'))
);
app.get('/faculty/dashboard', (req, res) => 
  res.sendFile(path.join(__dirname, '../Frontend/public/pages/facultyDashboard.html'))
);
app.get('/admin/dashboard', (req, res) => 
  res.sendFile(path.join(__dirname, '../Frontend/public/pages/adminDashboard.html'))
);

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body; // Simulated user data
  if(email === "demo@test.com" && password === "password123") {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '2h' });
    const role = 'admin';
    return res.status(200).json({ message: "Login successful", role, token });
  }
});

app.listen(6969, () => {
  console.log('✅ Server is running at http://localhost:6969 ✅');
});
