const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../Frontend/public")));

app.get('/auth/admin', (req, res) => res.sendFile(path.join(__dirname, '../Frontend/public/pages/adminLogin.html')));
app.get('/auth/faculty', (req, res) => res.sendFile(path.join(__dirname, '../Frontend/public/pages/facultyLogin.html')));
app.get('/auth/student', (req, res) => res.sendFile(path.join(__dirname, '../Frontend/public/pages/studentLogin.html')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../Frontend/index.html')));

app.listen(6969, () => {
  console.log('Server is running http://localhost:6969');
});