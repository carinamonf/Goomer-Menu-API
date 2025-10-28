import { Request, Response } from 'express';
import * as yup from 'yup';
import { ProdutoInput, ProdutoRepository } from './produto.repository';
import { ProdutoService, NotFoundError } from './produto.service';
import { createProdutoSchema, updateProdutoSchema } from './produto.schema';

const repository = new ProdutoRepository();
const service = new ProdutoService(repository);

export class ProdutoController {

  async create(req: Request, res: Response) {
    try {
      const data = await createProdutoSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      });

      const produto = await service.createProduto(data as ProdutoInput);

      return res.status(201).json(produto);

    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({ message: 'Erro de validação', errors: error.errors });
      }
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      const produtos = await service.listProdutos();
      return res.status(200).json(produtos);
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const produto = await service.getProdutoById(id as string);
      return res.status(200).json(produto);

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

      const data = await updateProdutoSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      });

      const updatedProduto = await service.updateProduto(id as string, data as any);

      return res.status(200).json(updatedProduto);

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
      await service.deleteProduto(id as string);

      return res.status(204).send(); 

    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}