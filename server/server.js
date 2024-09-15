const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Models
const Password = mongoose.model('Password', new mongoose.Schema({
  password: { type: String, required: true }
}));

// Routes
app.get('/api/passwords', async (req, res) => {
  const passwords = await Password.find();
  res.json(passwords);
});

app.post('/api/passwords', async (req, res) => {
  const { password } = req.body;
  const encryptedPassword = encryptPassword(password); // Implement encryption
  const newPassword = new Password({ password: encryptedPassword });
  await newPassword.save();
  res.json(newPassword);
});

// Encryption function
const encryptPassword = (password) => {
  // Simple encryption for demonstration purposes
  return Buffer.from(password).toString('base64');
};

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});