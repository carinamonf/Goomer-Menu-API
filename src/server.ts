import express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3333;

app.get('/', (req, res) => {
  res.json({ message: 'Goomer Menu API iniciado!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});