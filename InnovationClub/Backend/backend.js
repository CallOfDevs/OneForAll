const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const SECRET_KEY = 'Evarra nuvvu erripukaaaa cjdsncjkdscdcnjnuY&^*^&#EY^&(#Ybudbyiwebd7h7HHW&GF&WEGF&*GFyewbvfhyBHGEfyugewryufgh7w4gfy';

app.use(cors());
app.use(express.json());

// Serve static files correctly (no manual headers needed)
app.use(express.static(path.join(__dirname, "../Frontend/public")));

// Routes
app.get('/auth/admin', (req, res) => 
  res.sendFile(path.join(__dirname, '../Frontend/public/pages/adminLogin.html'))
);
app.get('/auth/faculty', (req, res) => 
  res.sendFile(path.join(__dirname, '../Frontend/public/pages/facultyLogin.html'))
);
app.get('/auth/student', (req, res) => 
  res.sendFile(path.join(__dirname, '../Frontend/public/pages/studentLogin.html'))
);
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, '../Frontend/index.html'))
);

app.get('/style/main', (req, res) => 
  res.sendFile(path.join(__dirname, '../Frontend/public/css/main.css'))
);
app.get('/js/main', (req, res) => 
  res.sendFile(path.join(__dirname, '../Frontend/public/js/main.js'))
);

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body; // Simulated user data
  if(email === "demo@test.com" && password === "password123") {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '2h' });
    return res.status(200).json({ message: "Login successful", role });
  }
});

app.listen(6969, () => {
  console.log('✅ Server is running at http://localhost:6969 ✅');
});
