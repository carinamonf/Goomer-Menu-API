import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('produtos', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());

    table.string('nome').notNullable();

    table.integer('preco').notNullable();

    table.enum('categoria', [
      'Entradas',
      'Pratos principais',
      'Sobremesas',
      'Bebidas'
    ]).notNullable();

    table.boolean('visivel').notNullable().defaultTo(true);

    table.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('produtos');
}

