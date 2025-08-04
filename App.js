import React, { useState } from 'react';
import './App.css';

function App() {
  const [bloodType, setBloodType] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bloodType, location }),
    });
    const data = await res.json();
    setResults(data.matched);
  };

  return (
    <div className="App">
      <h2>ThalCare AI - Donor Matching</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Blood Type (e.g. B+)" onChange={e => setBloodType(e.target.value)} required />
        <input type="text" placeholder="Location" onChange={e => setLocation(e.target.value)} required />
        <button type="submit">Find Donors</button>
      </form>

      <div>
        {results.length > 0 ? (
          <ul>
            {results.map((donor, idx) => (
              <li key={idx}>{donor.name} - {donor.bloodType} - {donor.location}</li>
            ))}
          </ul>
        ) : (
          <p>No donors found yet. Try different inputs.</p>
        )}
      </div>
    </div>
  );
}

export default App;
