const path = require('path');

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'postgres',
  migrations: [path.join(__dirname, 'src/migrations/*')],
  cli: {
    migrationsDir: 'src/migrations',
  },
  entities: [path.join(__dirname, 'src/**/*.entity.ts')],
};
