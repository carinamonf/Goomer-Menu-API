import { db } from '../../database/db';

export type PromocaoInput = {
  descricao: string;
  preco_promocional: number;  
  dias_ativos: number[]; 
  tempo_inicio: string;   
  tempo_fim: string;     
}

export type Promocao = {
  id: string;
  produto_id: string;
  descricao: string;
  preco_promocional: number;
  dias_ativos: number[];
  tempo_inicio: string;
  tempo_fim: string;
  created_at: string;
  updated_at: string;
}

export type PromocaoUpdateInput = Partial<PromocaoInput>;

export class PromocaoRepository {

  async create(produtoId: string, data: PromocaoInput): Promise<Promocao> {
    const { descricao, preco_promocional, dias_ativos, tempo_inicio, tempo_fim } = data;

    const query = `
      INSERT INTO promotions 
        (produto_id, descricao, preco_promocional, dias_ativos, tempo_inicio, tempo_fim)
      VALUES (?, ?, ?, ?, ?, ?)
      RETURNING *;
    `;

    const params = [
      produtoId, 
      descricao, 
      preco_promocional, 
      dias_ativos, 
      tempo_inicio, 
      tempo_fim
    ];

    const result = await db.raw(query, params);
    return result.rows[0];
  }

  async findAllByProduto(produtoId: string): Promise<Promocao[]> {
    const query = `
      SELECT * FROM promotions 
      WHERE produto_id = ? 
      ORDER BY tempo_inicio ASC;
    `;
    const result = await db.raw(query, [produtoId]);
    return result.rows;
  }

  async findById(id: string): Promise<Promocao | undefined> {
    const query = `SELECT * FROM promocoes WHERE id = ?;`;
    const result = await db.raw(query, [id]);
    return result.rows[0];
  }

  async update(id: string, data: PromocaoUpdateInput): Promise<Promocao | undefined> {
    const { descricao, preco_promocional, dias_ativos, tempo_inicio, tempo_fim } = data;

    const query = `
      UPDATE promocoes
      SET 
        descricao = COALESCE(?, descricao),
        preco_promocional = COALESCE(?, preco_promocional),
        dias_ativos = COALESCE(?, dias_ativos),
        tempo_inicio = COALESCE(?, tempo_inicio),
        tempo_fim = COALESCE(?, tempo_fim),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      RETURNING *;
    `;

    const params = [
      descricao, 
      preco_promocional, 
      dias_ativos, 
      tempo_inicio, 
      tempo_fim, 
      id
    ];

    const result = await db.raw(query, params);
    return result.rows[0];
  }

  async delete(id: string): Promise<void> {
    const query = `DELETE FROM promocoes WHERE id = ?;`;
    await db.raw(query, [id]);
  }
}