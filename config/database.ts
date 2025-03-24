export default ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: env('DATABASE_URL'),
    pool: { min: 2, max: 10 },
    acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
  },
})
