const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUsersCollection } = require('./db');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'ai-roadmappify-super-secret-key-2025';

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// ─── Middleware: Verify JWT ───────────────────────────────────────────────────
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
}

// ─── POST /api/signup ─────────────────────────────────────────────────────────
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    if (password.length < 6)
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });

    const users = await getUsersCollection();

    const existingUser = await users.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const insertResult = await users.insertOne({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      created_at: new Date(),
    });

    const userId = insertResult.insertedId.toString();
    const token = jwt.sign({ id: userId, name, email: email.toLowerCase() }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: userId, name, email: email.toLowerCase() } });
  } catch (err) {
    console.error('Signup error:', err);
    if (err.code === 11000) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ─── POST /api/login ──────────────────────────────────────────────────────────
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required.' });

    const users = await getUsersCollection();
    const user = await users.findOne({ email: email.toLowerCase() });

    if (!user) return res.status(401).json({ error: 'Invalid email or password.' });

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid email or password.' });

    const token = jwt.sign({ id: user._id.toString(), name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id.toString(), name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ─── GET /api/me ──────────────────────────────────────────────────────────────
app.get('/api/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Auth server running at http://localhost:${PORT}`);
});
