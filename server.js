import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Get all books
app.get('/api/books', async (req, res) => {
  const books = await prisma.book.findMany();
  res.json(books);
});

// Add a book to the cart (simulated)
app.post('/api/cart', (req, res) => {
  // In a real app, you'd store this in the database
  res.json({ message: 'Book added to cart' });
});

// Remove a book from the cart (simulated)
app.delete('/api/cart/:id', (req, res) => {
  // In a real app, you'd remove this from the database
  res.json({ message: 'Book removed from cart' });
});

// User login (simulated)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });

  if (user && user.password === password) {
    res.json({ message: 'Login successful', user: { username: user.username } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});