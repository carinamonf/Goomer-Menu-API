// src/modules/promotions/promotion.service.ts
import {
  PromocaoRepository,
  PromocaoInput,
  PromocaoUpdateInput,
  Promocao
} from './promocao.repository';

// Precisamos do ProdutoService para checar o preço original
import { ProdutoService } from '../produtos/produto.service';

// Vamos re-usar o erro de "Não Encontrado" do módulo de produtos
import { NotFoundError } from '../produtos/produto.service';

export class PromocaoService {

  constructor(
    private repository: PromocaoRepository,
    private produtoService: ProdutoService 
  ) {}

  async createPromocao(produtoId: string, data: PromocaoInput): Promise<Promocao> {

    const produto = await this.produtoService.getProdutoById(produtoId);

    if (data.preco_promocional >= produto.preco) {
      throw new Error('O preço promocional deve ser menor que o preço original do produto.');
    }

    if (data.tempo_inicio >= data.tempo_fim) {
      throw new Error('O horário de término deve ser maior que o horário de início.');
    }

    return this.repository.create(produtoId, data);
  }

  async listPromocoesByProduto(produtoId: string): Promise<Promocao[]> {
    await this.produtoService.getProdutoById(produtoId);

    return this.repository.findAllByProduto(produtoId);
  }

  async getPromocaoById(id: string): Promise<Promocao> {
    const promocao = await this.repository.findById(id);

    if (!promocao) {
      throw new NotFoundError('Promoção não encontrada.');
    }
    return promocao;
  }

  async updatePromocao(id: string, data: PromocaoUpdateInput): Promise<Promocao> {
    const existingPromocao = await this.getPromocaoById(id);

    if (data.preco_promocional !== undefined) {
      const produto = await this.produtoService.getProdutoById(existingPromocao.produto_id);
      if (data.preco_promocional >= produto.preco) {
        throw new Error('O preço promocional deve ser menor que o preço original do produto.');
      }
    }

    const updatedPromocao = await this.repository.update(id, data);

    if (!updatedPromocao) {
      throw new Error('Falha ao atualizar a promoção.');
    }
    return updatedPromocao;
  }

  async deletePromocao(id: string): Promise<void> {
    await this.getPromocaoById(id);

    await this.repository.delete(id);
  }
}