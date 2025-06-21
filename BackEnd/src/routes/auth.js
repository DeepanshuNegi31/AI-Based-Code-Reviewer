const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // For demonstration purposes - replace this with proper authentication
  if (username === 'Deepanshu' && password === '1234') {
    // In a real application, you should use proper JWT signing
    const token = 'dummy-token-' + Date.now();
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;