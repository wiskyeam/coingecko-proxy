const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/:url(*)', async (req, res) => {
  const { url } = req.params;

  try {
    const response = await fetch(`https://${url}`);
    const data = await response.text();

    res.set('Content-Type', response.headers.get('content-type'));
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch target URL', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
