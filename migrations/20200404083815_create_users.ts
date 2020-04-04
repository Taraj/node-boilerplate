import * as Knex from 'knex';


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('users');
}

