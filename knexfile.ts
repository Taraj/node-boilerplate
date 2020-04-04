
const knexConfig = {
  development: {
    client: 'mysql2',
    connection: {
      database: 'myDatabase',
      user: 'myUser',
      password: 'myPassword'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

module.exports = knexConfig;
export default knexConfig;
