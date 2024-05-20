import * as dotenv from 'dotenv';
dotenv.config();

module.exports = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: ['src/database/entity/*.ts'],
    migrations: ['src/database/migration/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
        entitiesDir: 'src/database/entity',
        migrationsDir: 'src/database/migration',
        subscribersDir: 'src/subscriber'
    }
}