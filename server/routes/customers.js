const express = require('express');
const router = express.Router();
const { db } = require('../firebase-config');

// GET all customers
router.get('/', async (req, res) => {
  try {
    const customersRef = db.collection('customers');
    const snapshot = await customersRef.get();
    const customers = [];
    snapshot.forEach(doc => customers.push({ id: doc.id, ...doc.data() }));
    res.status(200).json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

// GET a specific customer
router.get('/:id', async (req, res) => {
  try {
    const customerRef = db.collection('customers').doc(req.params.id);
    const doc = await customerRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
});

// POST a new customer
router.post('/', async (req, res) => {
  try {
    const newCustomer = req.body;
    const docRef = await db.collection('customers').add(newCustomer);
    res.status(201).json({ id: docRef.id, message: 'Customer added successfully' });
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({ error: 'Failed to add customer' });
  }
});

// PUT (update) an existing customer
router.put('/:id', async (req, res) => {
  try {
    const customerRef = db.collection('customers').doc(req.params.id);
    await customerRef.update(req.body);
    res.status(200).json({ message: 'Customer updated successfully' });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Failed to update customer' });
  }
});

// DELETE a customer
router.delete('/:id', async (req, res) => {
  try {
    const customerRef = db.collection('customers').doc(req.params.id);
    await customerRef.delete();
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
});

module.exports = router;