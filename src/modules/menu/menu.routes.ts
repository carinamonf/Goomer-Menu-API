import { Router } from 'express';
import { MenuController } from './menu.controller';

const menuRoutes = Router();
const controller = new MenuController();

/**
 * @swagger
 * /menu:
 *    get:
 *      summary: Obtém o cardápio consolidado com produtos visíveis e suas promoções ativas
 *      tags: [Menu]
 *      responses:
 *        '200':
 *          description: Cardápio obtido com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/FormattedMenu'
 *        '500':
 *          description: Erro interno do servidor
 */
menuRoutes.get('/', controller.getMenu);

export { menuRoutes };