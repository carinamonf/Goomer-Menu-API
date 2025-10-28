import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('produtos', (table) => {
    table.integer('posicao').notNullable().defaultTo(0);
  });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('produtos', (table) => {
        table.dropColumn('posicao');
    });
}

