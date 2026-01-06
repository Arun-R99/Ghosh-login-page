const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const USER = {
  email: "arun@gmail.com",
  password: "Arun@123"
};

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  if (email === USER.email && password === USER.password) {
    return res.json({ message: "Login successful" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
