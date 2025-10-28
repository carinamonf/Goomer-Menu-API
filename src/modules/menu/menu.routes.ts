import { Router } from 'express';
import { MenuController } from './menu.controller';

const menuRoutes = Router();
const controller = new MenuController();

menuRoutes.get('/', controller.getMenu);

export { menuRoutes };