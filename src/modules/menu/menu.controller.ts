import { Request, Response } from 'express';
import { MenuRepository } from './menu.repository';
import { MenuService } from './menu.service';

const repository = new MenuRepository();
const service = new MenuService(repository);

export class MenuController {

  async getMenu(req: Request, res: Response) {
    try {
      const menu = await service.getFormattedMenu();
      return res.status(200).json(menu);
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}