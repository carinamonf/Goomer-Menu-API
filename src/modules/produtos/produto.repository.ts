import { db } from '../../database/db'; 

export type ProdutoInput = {
  nome: string;
  preco: number; 
  categoria: 'Entradas' | 'Pratos principais' | 'Sobremesas' | 'Bebidas';
}

export type Produto = {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
  visivel: boolean;
  posicao: number;
  created_at: string;
  updated_at: string;
}

export type ProdutoUpdateInput = Partial<ProdutoInput & { visivel: boolean; posicao: number }>;

export class ProdutoRepository {

  async create(data: ProdutoInput): Promise<Produto> {
    const query = `
      INSERT INTO produtos (nome, preco, categoria)
      VALUES (?, ?, ?)
      RETURNING *;
    `;

    const params = [data.nome, data.preco, data.categoria];

    const result = await db.raw(query, params);

    return result.rows[0];
  }

  async findAll(): Promise<Produto[]> {
    const query = `SELECT * FROM produtos ORDER BY nome ASC;`;
    const result = await db.raw(query);
    return result.rows;
  }

  async findById(id: string): Promise<Produto | undefined> {
    const query = `SELECT * FROM produtos WHERE id = ?;`;
    const result = await db.raw(query, [id]);
    return result.rows[0]; 
  }

  async update(id: string, data: ProdutoUpdateInput): Promise<Produto | undefined> {
    const { nome, preco, categoria, visivel, posicao } = data;

    const query = `
      UPDATE produtos
      SET 
        nome = COALESCE(?, nome),
        preco = COALESCE(?, preco),
        categoria = COALESCE(?, categoria),
        visivel = COALESCE(?, visivel),
        posicao = COALESCE(?, posicao),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      RETURNING *;
    `;

    const params = [nome, preco, categoria, visivel, posicao, id];

    const result = await db.raw(query, params);
    return result.rows[0];
  }

  async delete(id: string): Promise<void> {
    const query = `DELETE FROM produtos WHERE id = ?;`;
    await db.raw(query, [id]);
  }
}