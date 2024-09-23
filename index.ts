import { config } from "dotenv";
config();
import express from "express";
import { sequelize } from "./config/database";
import { AddressInfo } from "net";
import { default as logger } from './logger';
const app = express();

app.use(express.urlencoded())
.use(express.json());

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT,async()=>{

    await sequelize.authenticate();

    const { address, port } = server.address() as AddressInfo;

    logger.log(`Server Started On Port ${address} ${port}`);
})