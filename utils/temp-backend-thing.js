const express = require('express');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

// Azure SQL Database connection
const config = {
  user: 'youruser',
  password: 'yourpassword',
  server: 'yourserver.database.windows.net',
  database: 'yourdb',
  options: { encrypt: true }
};

// Fetch all shows
app.get('/shows', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query("SELECT * FROM Shows WHERE standardShow = 1");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => console.log(`API running on port ${port}`));
