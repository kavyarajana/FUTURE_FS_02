const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Fake database - array lo store chestam
let customers = [
  { id: 1, name: "Ravi Kumar", email: "ravi@gmail.com", phone: "9876543210", company: "Tech Corp", status: "Lead" },
  { id: 2, name: "Priya Sharma", email: "priya@gmail.com", phone: "8765432109", company: "Web Solutions", status: "Customer" }
];
let nextId = 3;

// 1. GET all customers
app.get('/api/customers', (req, res) => {
  res.json(customers);
});

// 2. POST new customer
app.post('/api/customers', (req, res) => {
  const newCustomer = { id: nextId++, ...req.body };
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

// 3. DELETE customer
app.delete('/api/customers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  customers = customers.filter(c => c.id !== id);
  res.json({ message: 'Customer deleted' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend: http://localhost:${PORT}`);
  console.log(`✅ Server running without MongoDB`);
});