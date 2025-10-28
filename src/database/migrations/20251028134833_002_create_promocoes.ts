import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('promocoes', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());

    table.uuid('produto_id')
      .notNullable()
      .references('id')       
      .inTable('produtos')
      .onDelete('CASCADE');

    table.string('descricao').notNullable();

    table.integer('preco_promocional').notNullable();

    table.specificType('dias_ativos', 'INT[]').notNullable();

    table.time('tempo_inicio').notNullable();
    table.time('tempo_fim').notNullable();

    table.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('promocoes');
}

