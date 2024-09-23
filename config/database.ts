import { config } from "dotenv";
config();
import { Sequelize } from "sequelize-typescript"
import User from "../src/model/User";

const sequelize = new Sequelize(
    process.env.PG_DATABASE_NAME ?? '',
    process.env.PG_DATABASE_USERNAME ?? '',
    process.env.PG_DATABASE_PASSWORD,
    {
        host: process.env.PG_DATABASE_HOST,
        port: Number(process.env.PG_DATABASE_PORT),
        dialect: 'postgres',
        logging: true
    }
)

sequelize.addModels([User])

export {
    sequelize
}