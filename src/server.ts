import express = require("express");
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import { produtoRoutes } from "./modules/produtos/produto.routes";
import { promocaoRoutes } from "./modules/promocoes/promocao.routes";
import { menuRoutes } from "./modules/menu/menu.routes";

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(express.json());

const PORT = process.env.PORT || 3333;

app.use('/api/produtos', produtoRoutes);
app.use('/api', promocaoRoutes);
app.use('/api/menu', menuRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Goomer Menu API iniciado!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});