const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// In-memory data stores with some initial data
let customers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', total_spends: 500, visits: 5, last_visit: '2025-08-15' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', total_spends: 12000, visits: 2, last_visit: '2025-09-10' },
    { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', total_spends: 250, visits: 10, last_visit: '2025-09-12' },
];
let orders = [
    { id: 1, customerId: 1, amount: 200, date: '2025-08-10' },
    { id: 2, customerId: 1, amount: 300, date: '2025-08-15' },
    { id: 3, customerId: 2, amount: 12000, date: '2025-09-10' },
    { id: 4, customerId: 3, amount: 100, date: '2025-09-01' },
    { id: 5, customerId: 3, amount: 150, date: '2025-09-12' },
];

// --- API Endpoints ---

// GET /api/customers
app.get('/api/customers', (req, res) => {
  res.json(customers);
});

// POST /api/customers
app.post('/api/customers', (req, res) => {
  const newCustomer = { id: customers.length + 1, ...req.body };
  customers.push(newCustomer);
  console.log('Added customer:', newCustomer);
  res.status(201).json(newCustomer);
});

// GET /api/orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// POST /api/orders
app.post('/api/orders', (req, res) => {
  const newOrder = { id: orders.length + 1, ...req.body };
  orders.push(newOrder);
  console.log('Added order:', newOrder);
  res.status(201).json(newOrder);
});

// A simple dummy vendor API
app.post('/vendor/send', (req, res) => {
    const success = Math.random() > 0.1; // 90% success rate
    if (success) {
        res.json({ status: 'SENT' });
    } else {
        res.status(500).json({ status: 'FAILED' });
    }
});


// POST /api/suggest-messages
app.post('/api/suggest-messages', (req, res) => {
  const { objective } = req.body;

  if (!objective) {
    return res.status(400).json({ error: 'Objective is required' });
  }

  // Mock AI logic
  const suggestions = [];
  const lowerCaseObjective = objective.toLowerCase();

  if (lowerCaseObjective.includes('inactive') || lowerCaseObjective.includes('back')) {
    suggestions.push('We miss you! Here\'s a 15% off coupon to welcome you back.');
    suggestions.push('It\'s been a while! Come see what\'s new.');
    suggestions.push('Your presence has been missed. Enjoy a special offer on us!');
  } else if (lowerCaseObjective.includes('new') || lowerCaseObjective.includes('welcome')) {
    suggestions.push('Welcome to the family! Get 10% off your first purchase.');
    suggestions.push('Thanks for joining us! Here\'s a little welcome gift.');
    suggestions.push('Hello and welcome! We\'re so glad to have you.');
  } else if (lowerCaseObjective.includes('spend') || lowerCaseObjective.includes('purchase') || lowerCaseObjective.includes('buy')) {
    suggestions.push('Treat yourself! You deserve it. Here\'s a special offer.');
    suggestions.push('Ready for your next purchase? Get free shipping on us!');
    suggestions.push('Thank you for being a loyal customer! Enjoy this exclusive deal.');
  } else {
    suggestions.push('Check out our latest arrivals!');
    suggestions.push('Don\'t miss out on our new collection.');
    suggestions.push('A special promotion, just for you.');
  }

  res.json({ suggestions });
});

app.listen(port, () => {

  console.log(`Backend server listening at http://localhost:${port}`);
});
