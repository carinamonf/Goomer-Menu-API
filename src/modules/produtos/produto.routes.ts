import { Router } from 'express';
import { ProdutoController } from './produto.controller';

const produtoRoutes = Router();

const controller = new ProdutoController();

produtoRoutes.post('/', controller.create);
produtoRoutes.get('/', controller.listAll);
produtoRoutes.get('/:id', controller.getOne);
produtoRoutes.put('/:id', controller.update);
produtoRoutes.delete('/:id', controller.delete);

export { produtoRoutes };