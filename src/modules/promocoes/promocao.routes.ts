import { Router } from 'express';
import { PromocaoController } from './promocao.controller';

const promocaoRoutes = Router();
const controller = new PromocaoController();

/**
 * @swagger
 * /produtos/{produtoId}/promocoes:
 *   post:
 *     summary: Cria uma nova promoção para um produto
 *     tags: [Promoções]
 *     parameters:
 *       - in: path
 *         name: produtoId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do produto a ser promovido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePromocaoInput'
 *     responses:
 *       '201':
 *         description: Promoção criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Promocao'
 *       '400':
 *         description: 'Erro de validação (ex: preço, horário)'
 *       '404':
 *         description: Produto não encontrado
 */
promocaoRoutes.post('/produtos/:produtoId/promocoes', controller.create);

/**
 * @swagger
 * /produtos/{produtoId}/promocoes:
 *   get:
 *     summary: Lista todas as promoções de um produto
 *     tags: [Promoções]
 *     parameters:
 *       - in: path
 *         name: produtoId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do produto cujas promoções devem ser listadas
 *     responses:
 *       '200':
 *         description: Lista de promoções do produto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Promocao'
 *       '404':
 *         description: Produto não encontrado
 */
promocaoRoutes.get('/produtos/:produtoId/promocoes', controller.listByProduto);


/**
 * @swagger
 * /promocoes/{id}:
 *   get:
 *     summary: Obtém uma promoção pelo ID
 *     tags: [Promoções]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da promoção a ser obtida
 *     responses:
 *       '200':
 *         description: Promoção encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Promocao'
 *       '404':
 *         description: Promoção não encontrada
 */
// Assumindo que o método se chama 'getOne'
promocaoRoutes.get('/promocoes/:id', controller.getOne);

/**
 * @swagger
 * /promocoes/{id}:
 *   put:
 *     summary: Atualiza uma promoção existente
 *     tags: [Promoções]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da promoção a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePromocaoInput'
 *     responses:
 *       '200':
 *         description: Promoção atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Promocao'
 *       '400':
 *         description: Erro de validação
 *       '404':
 *         description: Promoção não encontrada
 */
promocaoRoutes.put('/promocoes/:id', controller.update);

/**
 * @swagger
 * /promocoes/{id}:
 *   delete:
 *     summary: Remove uma promoção pelo ID
 *     tags: [Promoções]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da promoção a ser removida
 *     responses:
 *       '204':
 *         description: Promoção removida com sucesso (sem conteúdo)
 *       '404':
 *         description: Promoção não encontrada
 */
promocaoRoutes.delete('/promocoes/:id', controller.delete);

export { promocaoRoutes };
