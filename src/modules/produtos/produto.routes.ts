import { Router } from 'express';
import { ProdutoController } from './produto.controller';

const produtoRoutes = Router();

const controller = new ProdutoController();

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProdutoInput'
 *     responses:
 *       '201':
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       '400':
 *         description: Erro de validação
 */
produtoRoutes.post('/', controller.create);

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       '200':
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *       '500':
 *         description: Erro interno do servidor
 */
produtoRoutes.get('/', controller.listAll);

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Obtém um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do produto a ser obtido
 *     responses:
 *       '200':
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       '404':
 *         description: Produto não encontrado
 */
produtoRoutes.get('/:id', controller.getOne);

/** 
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do produto a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProdutoInput'
 *     responses:
 *       '200':
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       '400':
 *         description: Erro de validação
 *       '404':
 *         description: Produto não encontrado
 */
produtoRoutes.put('/:id', controller.update);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Remove um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do produto a ser removido
 *     responses:
 *       '204':
 *         description: Produto removido com sucesso (sem conteúdo)
 *       '404':
 *         description: Produto não encontrado
 */
produtoRoutes.delete('/:id', controller.delete);

export { produtoRoutes };