const express = require('express');
const path = require('path');
const app = express();

// Статические файлы из каталога 'public'
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
