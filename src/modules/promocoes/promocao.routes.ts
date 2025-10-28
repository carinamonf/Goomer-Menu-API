import { Router } from 'express';
import { PromocaoController } from './promocao.controller';

const promocaoRoutes = Router();
const controller = new PromocaoController();

promocaoRoutes.post('/produtos/:productId/promocoes', controller.create);
promocaoRoutes.get('/produtos/:productId/promocoes', controller.listByProduto);

promocaoRoutes.get('/promocoes/:id', controller.getOne);
promocaoRoutes.put('/promocoes/:id', controller.update);
promocaoRoutes.delete('/promocoes/:id', controller.delete);

export { promocaoRoutes };