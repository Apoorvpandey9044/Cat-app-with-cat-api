const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoints
// Endpoint to fetch cat images
app.get('/api/cats', async (req, res) => {
  try {
    const { limit = 10, breed_ids = '' } = req.query;
    let apiUrl = `https://api.thecatapi.com/v1/images/search?limit=${limit}&has_breeds=1`;

    if (breed_ids) {
      apiUrl += `&breed_ids=${breed_ids}`;
    }

    const response = await axios.get(apiUrl, {
      headers: {
        'x-api-key': 'live_jtDBlj6Ogo8a2AMHUCWgxJK45KLnJtdfI2QYz6P57uo3ipKFJgQMwLuR3MRZ6CPM'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching cat images:', error.message);
    if (error.response) {
      console.error('Error details:', error.response.data);
      console.error('Error status:', error.response.status);
      res.status(error.response.status).json({ message: 'Error fetching data from The Cat API', details: error.response.data });
    } else if (error.request) {
      console.error('Error request:', error.request);
      res.status(500).json({ message: 'No response received from The Cat API' });
    } else {
      res.status(500).json({ message: 'Error setting up request to The Cat API', error: error.message });
    }
  }
});

// Endpoint to fetch cat breeds
app.get('/api/breeds', async (req, res) => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds', {
      headers: {
        'x-api-key': 'live_jtDBlj6Ogo8a2AMHUCWgxJK45KLnJtdfI2QYz6P57uo3ipKFJgQMwLuR3MRZ6CPM'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching cat breeds:', error.message);
     if (error.response) {
      console.error('Error details:', error.response.data);
      console.error('Error status:', error.response.status);
      res.status(error.response.status).json({ message: 'Error fetching breeds from The Cat API', details: error.response.data });
    } else if (error.request) {
      console.error('Error request:', error.request);
      res.status(500).json({ message: 'No response received from The Cat API' });
    } else {
      res.status(500).json({ message: 'Error setting up request to The Cat API', error: error.message });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});