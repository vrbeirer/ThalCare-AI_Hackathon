const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock Donor Data
const donors = [
  { name: 'Ravi', bloodType: 'B+', lastDonated: '2025-07-01', location: 'Mumbai' },
  { name: 'Ayesha', bloodType: 'B+', lastDonated: '2025-06-10', location: 'Mumbai' },
  { name: 'Imran', bloodType: 'O-', lastDonated: '2025-07-20', location: 'Pune' },
];

// Donor Matching Endpoint
app.post('/api/match', (req, res) => {
  const { bloodType, location } = req.body;

  const matched = donors.filter(d =>
    d.bloodType === bloodType && d.location.toLowerCase() === location.toLowerCase()
  );

  res.json({ matched });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
