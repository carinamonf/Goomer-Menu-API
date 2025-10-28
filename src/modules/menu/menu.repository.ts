import { db } from '../../database/db';

export type MenuItem = {
  id: string;
  nome: string;
  categoria: string;
  preco_original: number;
  preco_final: number;
  descricao_promocao: string | null;
  promocao_ativa: boolean;
}

export class MenuRepository {

  async getActiveMenu(): Promise<MenuItem[]> {

    const query = `
      SELECT
          p.id,
          p.nome,
          p.categoria,
          p.preco AS preco_original,
          pr.descricao AS descricao_promocao,

          CASE
              WHEN pr.id IS NOT NULL THEN pr.preco_promocional
              ELSE p.preco
          END AS preco_final,

          CASE
              WHEN pr.id IS NOT NULL THEN true
              ELSE false
          END AS promocao_ativa

      FROM
          produtos p
      LEFT JOIN
          promocoes pr ON p.id = pr.produto_id
          AND (
              EXTRACT(DOW FROM CURRENT_DATE) = ANY(pr.dias_ativos)
              AND CURRENT_TIME BETWEEN pr.tempo_inicio AND pr.tempo_fim
          )
      WHERE
          p.visivel = true
      ORDER BY
          p.categoria ASC, p.nome ASC;
    `;

    const result = await db.raw(query);
    return result.rows;
  }
}