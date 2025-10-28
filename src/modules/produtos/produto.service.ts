import {
    ProdutoRepository,
    ProdutoInput,
    ProdutoUpdateInput,
    Produto
} from './produto.repository';

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export class ProdutoService {

    constructor(private repository: ProdutoRepository) { }

    async createProduto(data: ProdutoInput): Promise<Produto> {

        if (data.preco <= 0) {
            throw new Error('O preço do produto deve ser maior que zero.');
        }

        //TODO: adicionar outras validações de negócio aqui

        return this.repository.create(data);
    }

    async listProdutos(): Promise<Produto[]> {
        return this.repository.findAll();
    }

    async getProdutoById(id: string): Promise<Produto> {
        const produto = await this.repository.findById(id);

        if (!produto) {
            throw new NotFoundError('Produto não encontrado.');
        }

        return produto;
    }

    async updateProduto(id: string, data: ProdutoUpdateInput): Promise<Produto> {
       
        await this.getProdutoById(id);

        if (data.preco !== undefined && data.preco <= 0) {
            throw new Error('O preço do produto deve ser maior que zero.');
        }

        const updatedProduto = await this.repository.update(id, data);

        if (!updatedProduto) {
            throw new Error('Falha ao atualizar o produto.');
        }

        return updatedProduto;
    }

    async deleteProduto(id: string): Promise<void> {

        await this.getProdutoById(id);
        await this.repository.delete(id);
        
    }
}