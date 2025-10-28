import { MenuRepository, MenuItem } from './menu.repository';

type FormattedMenu = {
  [categoria: string]: MenuItem[];
}

export class MenuService {

  constructor(private repository: MenuRepository) {}

  async getFormattedMenu(): Promise<FormattedMenu> {
    const flatMenu = await this.repository.getActiveMenu();


    const formattedMenu = flatMenu.reduce((acc, item) => {
      const { categoria } = item;

      if (!acc[categoria]) {
        acc[categoria] = [];
      }

      acc[categoria].push(item);

      return acc;
    }, {} as FormattedMenu);

    return formattedMenu;
  }
}