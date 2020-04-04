import * as Knex from 'knex';


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('login_entries', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('token').notNullable();
        table.dateTime('expiryDate').notNullable();
        table.dateTime('creationDate').notNullable();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('login_entries');
}

