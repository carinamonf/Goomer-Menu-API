import { Request, Response } from 'express';
import * as yup from 'yup';
import { PromocaoInput, PromocaoRepository } from './promocao.repository';
import { PromocaoService } from './promocao.service';
import { createPromocaoSchema, updatePromocaoSchema } from './promocao.schema';
import { ProdutoRepository } from '../produtos/produto.repository';
import { ProdutoService, NotFoundError } from '../produtos/produto.service';

const produtoRepository = new ProdutoRepository();
const produtoService = new ProdutoService(produtoRepository);

const promocaoRepository = new PromocaoRepository();

const service = new PromocaoService(promocaoRepository, produtoService);

export class PromocaoController {

  async create(req: Request, res: Response) {
    try {
      const { produtoId } = req.params;

      const data = await createPromocaoSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      });

      const promocao = await service.createPromocao(produtoId as string, data as PromocaoInput);

      return res.status(201).json(promocao);

    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({ message: 'Erro de validação', errors: error.errors });
      }
      if (error instanceof NotFoundError) { 
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async listByProduto(req: Request, res: Response) {
    try {
      const { produtoId } = req.params;
      const promocoes = await service.listPromocoesByProduto(produtoId as string);
      return res.status(200).json(promocoes);

    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const data = await updatePromocaoSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      });

      const updatedPromocao = await service.updatePromocao(id as string, data as PromocaoInput);

      return res.status(200).json(updatedPromocao);

    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({ message: 'Erro de validação', errors: error.errors });
      }
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await service.deletePromocao(id as string);
      return res.status(204).send();

    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const promocao = await service.getPromocaoById(id as string);
      return res.status(200).json(promocao);

    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}