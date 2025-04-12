const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const USERS_FILE = path.join(__dirname, '../data/users.json');


const readUsers = () => {
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
};

const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

router.post('/register', (req, res) => {
  const { name, email, password, mobile, role } = req.body;

  if (!name || !email || !password || !mobile || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const users = readUsers();

  const alreadyExists = users.find((u) => u.email === email);
  if (alreadyExists) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const newUser = { id: Date.now(), name, email, password, mobile, role };
  users.push(newUser);
  writeUsers(users);

  return res.status(201).json({ message: 'User registered successfully', user: newUser });
});




router.post('/login', (req, res) => {
  const { email, password, role } = req.body;

  const users = readUsers();

  const user = users.find(
    (u) => u.email === email && u.password === password && u.role === role
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid email, password, or role' });
  }

  return res.status(200).json({
    message: 'Login successful',
    user,
  });
});



router.get('/users', (req, res) => {
  const users = readUsers();
  res.json(users);
});

router.get('/users/:id', (req, res) => {
  const users = readUsers();
  const userId = parseInt(req.params.id);

  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
});

router.put('/users/:id', (req, res) => {
  const users = readUsers();
  const userId = parseInt(req.params.id);

  const index = users.findIndex(u => u.id === userId);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const updatedData = req.body;


  users[index] = { ...users[index], ...updatedData, id: userId };

  writeUsers(users);

  res.status(200).json({ message: 'User updated successfully', user: users[index] });
});


module.exports = router;
