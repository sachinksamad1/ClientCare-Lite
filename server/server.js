const express = require('express');
const cors = require('cors');
const customerRoutes = require('./routes/customers');
const ticketRoutes = require('./routes/tickets'); // Assuming you created this

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/customers', customerRoutes);
app.use('/api/tickets', ticketRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});