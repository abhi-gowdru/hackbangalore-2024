// pages/protected.js
import React, { useState } from 'react';
import withAuth from '@/backend/withAuth';
import axios from 'axios';

function HomePage() {
  const [gstNumber, setGSTNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`/api/gstin/${gstNumber}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setGSTNumber(event.target.value);
  };

  return (
    <div>
      <h1>Check GSTIN Status</h1>
      <form onSubmit={handleSubmit}>
        <label>
          GST Number:
          <input
            type="text"
            value={gstNumber}
            onChange={handleChange}
            placeholder="Enter GST Number"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>See console for data.</p>
    </div>
  );
}

export default withAuth(HomePage);
