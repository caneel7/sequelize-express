import { config } from "dotenv";
config();
import express from "express";
const app = express();
import { sequelize } from "./config/database";
import { AddressInfo } from "net";
import { default as logger } from './logger';
import router from "./src/router";

app.use(express.urlencoded())
    .use(express.json())
    .use(logger.logEvents)
    .use(router);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, async () => {

    await sequelize.authenticate();
    const { address, port } = server.address() as AddressInfo;
    logger.log(`Server Started On Port ${address} ${port}`);
    server.emit('connected');
})

export {
    server
};