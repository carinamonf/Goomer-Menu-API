
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PromocaoService } from '../modules/promocoes/promocao.service';
import { ProdutoService, NotFoundError } from '../modules/produtos/produto.service';
import { PromocaoRepository } from '../modules/promocoes/promocao.repository';

const mockProdutoService = {
  getProdutoById: vi.fn(),
};

const mockPromocaoRepository = {
  create: vi.fn(),
};

const promocaoService = new PromocaoService(
  mockPromocaoRepository as any,
  mockProdutoService as any
);


describe('PromocaoService: createPromocao', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });


  it('deve falhar se o preço promocional for maior que o original', async () => {

    const produtoId = 'produto-id-123';
    const promocaoData = {
      descricao: 'Promoção cara',
      preco_promocional: 2000,
      dias_ativos: [1],
      tempo_inicio: '18:00',
      tempo_fim: '20:00',
    };

    mockProdutoService.getProdutoById.mockResolvedValue({
      id: produtoId,
      nome: 'Produto Teste',
      preco: 1500,
    });

    await expect(
      promocaoService.createPromocao(produtoId, promocaoData)
    ).rejects.toThrow('O preço promocional deve ser menor que o preço original do produto.');

    expect(mockPromocaoRepository.create).not.toHaveBeenCalled();
  });

  it('deve falhar se o horário de término for menor que o de início', async () => {

    const produtoId = 'produto-id-123';
    const promocaoData = {
      descricao: 'Horário inválido',
      preco_promocional: 1000,
      dias_ativos: [1],
      tempo_inicio: '20:00',
      tempo_fim: '18:00',
    };

    mockProdutoService.getProdutoById.mockResolvedValue({
      id: produtoId,
      name: 'Produto Teste',
      price: 1500,
    });

    await expect(
      promocaoService.createPromocao(produtoId, promocaoData)
    ).rejects.toThrow('O horário de término deve ser maior que o horário de início.');
  });

  it('deve criar a promoção com sucesso se todas as regras passarem', async () => {

    const produtoId = 'produto-id-123';
    const promocaoData = {
      descricao: 'Promoção válida',
      preco_promocional: 1000,
      dias_ativos: [1, 2, 3],
      tempo_inicio: '18:00',
      tempo_fim: '22:00',
    };

    mockProdutoService.getProdutoById.mockResolvedValue({   
      id: produtoId,
      nome: 'Produto Teste',
      preco: 1500,
    });

    const expectedPromocao = { ...promocaoData, id: 'promo-id-abc', produto_id: produtoId };
    mockPromocaoRepository.create.mockResolvedValue(expectedPromocao);

    const result = await promocaoService.createPromocao(produtoId, promocaoData);

    expect(mockPromocaoRepository.create).toHaveBeenCalledWith(produtoId, promocaoData);

    expect(result).toEqual(expectedPromocao);
  });
});