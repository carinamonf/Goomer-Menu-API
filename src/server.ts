import express = require("express");
import { produtoRoutes } from "./modules/produtos/produto.routes";
import { promocaoRoutes } from "./modules/promocoes/promocao.routes";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3333;

app.use('/api/produtos', produtoRoutes);
app.use('/api', promocaoRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Goomer Menu API iniciado!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});