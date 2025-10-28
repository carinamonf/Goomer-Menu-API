import * as yup from 'yup';

const allowedCategories = [
  'Entradas',
  'Pratos principais',
  'Sobremesas',
  'Bebidas'
];

export const createProdutoSchema = yup.object().shape({
  nome: yup.string()
    .required('O nome é obrigatório.')
    .min(3, 'O nome deve ter no mínimo 3 caracteres.'),

  preco: yup.number()
    .required('O preço é obrigatório.')
    .positive('O preço deve ser um valor positivo.')
    .integer('O preço deve ser um número inteiro (centavos).'),

  categoria: yup.string()
    .required('A categoria é obrigatória.')
    .oneOf(allowedCategories, 'Categoria inválida.'),
});


export const updateProdutoSchema = yup.object().shape({
  nome: yup.string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres.'),

  preco: yup.number()
    .positive('O preço deve ser um valor positivo.')
    .integer('O preço deve ser um número inteiro (centavos).'),

  categoria: yup.string()
    .oneOf(allowedCategories, 'Categoria inválida.'),

  visivel: yup.boolean(),
});