import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Goomer Menu API',
      version: '1.0.0',
      description: 'API para gerenciar o cardápio de um restaurante (Desafio Técnico)',
    },
    servers: [
      {
        url: `http://localhost:3333`,
        description: 'Servidor de Desenvolvimento',
      },
    ],
    tags: [
      {
        name: 'Produtos',
        description: 'Operações relacionadas a produtos',
      },
      {
        name: 'Promoções',
        description: 'Operações relacionadas a promoções',
      },
      {
        name: 'Menu',
        description: 'Visualização do cardápio consolidado',
      },
    ],
      components: {
      schemas: {
        Produto: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            nome: { type: 'string' },
            preco: { type: 'integer', description: 'Preço em centavos' },
            categoria: { type: 'string', enum: ['Entradas', 'Pratos principais', 'Sobremesas', 'Bebidas'] },
            visivel: { type: 'boolean' },
            posicao: { type: 'integer', description: 'Posição do produto na listagem' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
          example: {
            id: 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8',
            nome: 'X-Burger',
            preco: 2550,
            categoria: 'Pratos principais',
            visivel: true,
            posicao: 1,
            created_at: '2025-10-28T18:30:00Z',
            updated_at: '2025-10-28T18:30:00Z',
          }
        },
        CreateProdutoInput: {
          type: 'object',
          required: ['nome', 'preco', 'categoria'],
          properties: {
            nome: { type: 'string', minLength: 3 },
            preco: { type: 'integer', description: 'Preço em centavos (ex: 1050 para R$ 10,50)', exclusiveMin: 0 },
            categoria: { type: 'string', enum: ['Entradas', 'Pratos principais', 'Sobremesas', 'Bebidas'] },
          },
          example: {
            nome: 'Batata Frita',
            preco: 1500,
            categoria: 'Entradas'
          }
        },
        UpdateProdutoInput: {
          type: 'object',
          properties: {
            nome: { type: 'string', minLength: 3 },
            preco: { type: 'integer', description: 'Preço em centavos', exclusiveMin: 0 },
            categoria: { type: 'string', enum: ['Entradas', 'Pratos principais', 'Sobremesas', 'Bebidas'] },
            visivel: { type: 'boolean' },
            posicao: { type: 'integer' },
          },
          example: {
            preco: 1800,
            posicao: 1
          }
        },

        Promocao: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            produto_id: { type: 'string', format: 'uuid' },
            descricao: { type: 'string' },
            preco_promocional: { type: 'integer', description: 'Preço promocional em centavos' },
            dias_ativos: { type: 'array', items: { type: 'integer', min: 0, max: 6 }, description: 'Dias da semana (0=Dom, 1=Seg...)' },
            tempo_inicio: { type: 'string', description: 'Formato HH:mm', example: '18:00' },
            tempo_fim: { type: 'string', description: 'Formato HH:mm', example: '22:00' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
          example: {
            id: 'b1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n9',
            produto_id: 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8',
            descricao: 'Happy Hour!',
            preco_promocional: 1200,
            dias_ativos: [2, 3, 4],
            tempo_inicio: '18:00',
            tempo_fim: '20:00',
            created_at: '2025-10-28T19:00:00Z',
            updated_at: '2025-10-28T19:00:00Z',
          }
        },
        CreatePromocaoInput: {
          type: 'object',
          required: ['descricao', 'preco_promocional', 'dias_ativos', 'tempo_inicio', 'tempo_fim'],
          properties: {
            descricao: { type: 'string' },
            preco_promocional: { type: 'integer', description: 'Preço promocional em centavos', exclusiveMin: 0 },
            dias_ativos: { type: 'array', items: { type: 'integer', min: 0, max: 6 }, description: 'Dias da semana (0=Dom, 1=Seg...)' },
            tempo_inicio: { type: 'string', description: 'Formato HH:mm (intervalos de 15 min)', example: '18:00' },
            tempo_fim: { type: 'string', description: 'Formato HH:mm (intervalos de 15 min)', example: '20:00' },
          },
          example: {
            descricao: 'Happy Hour de Chopp',
            preco_promocional: 500,
            dias_ativos: [1, 2, 3, 4, 5],
            tempo_inicio: '18:00',
            tempo_fim: '20:00',
          }
        },
        UpdatePromocaoInput: {
          type: 'object',
          properties: {
            descricao: { type: 'string' },
            preco_promocional: { type: 'integer', description: 'Preço promocional em centavos', exclusiveMin: 0 },
            dias_ativos: { type: 'array', items: { type: 'integer', min: 0, max: 6 }, description: 'Dias da semana (0=Dom, 1=Seg...)' },
            tempo_inicio: { type: 'string', description: 'Formato HH:mm (intervalos de 15 min)', example: '18:00' },
            tempo_fim: { type: 'string', description: 'Formato HH:mm (intervalos de 15 min)', example: '20:00' },
          },
          example: {
            descricao: 'Happy Hour Estendido!',
            tempo_fim: '21:00'
          }
        },
        MenuItem: {
          type: 'object',
          description: 'Item do cardápio como visto pelo cliente final',
          properties: {
            id: { type: 'string', format: 'uuid' },
            nome: { type: 'string' },
            categoria: { type: 'string' },
            preco_original: { type: 'integer', description: 'Preço original em centavos' },
            preco_final: { type: 'integer', description: 'Preço final (com promoção, se ativa)' },
            descricao_promocao: { type: 'string', nullable: true, description: 'Descrição da promoção, se ativa' },
            promocao_ativa: { type: 'boolean', description: 'Indica se uma promoção está ativa AGORA' },
          },
          example: {
            id: 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8',
            nome: 'Chopp Pilsen',
            categoria: 'Bebidas',
            preco_original: 1000,
            preco_final: 500,
            descricao_promocao: 'Happy Hour de Chopp',
            promocao_ativa: true
          }
        },
        FormattedMenu: {
          type: 'object',
          description: 'O cardápio formatado, agrupado por categoria.',
          additionalProperties: {
            type: 'array',
            items: { $ref: '#/components/schemas/MenuItem' }
          },
          example: {
            "Entradas": [
              {
                id: 'c1...',
                nome: 'Batata Frita',
                categoria: 'Entradas',
                preco_original: 1500,
                preco_final: 1500,
                descricao_promocao: null,
                promocao_ativa: false
              }
            ],
            "Bebidas": [
              {
                id: 'd2...',
                nome: 'Chopp Pilsen',
                categoria: 'Bebidas',
                preco_original: 1000,
                preco_final: 500,
                descricao_promocao: 'Happy Hour de Chopp',
                promocao_ativa: true
              }
            ]
          }
        }
        
      }
    },  
  },
  apis: ['./src/modules/**/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;