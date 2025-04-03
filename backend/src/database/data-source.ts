import "reflect-metadata"
import { DataSource } from "typeorm"
import User from "../models/User"
import { CreateUsers1743688042218 } from "./migrations/1743688042218-CreateUsers"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "database-redes.cq2qp8qkh4sh.us-east-1.rds.amazonaws.com",
    port: 3306,
    username: "admin",
    password: "MetaCode411#",
    database: "database-redes",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [CreateUsers1743688042218],
    subscribers: [],
})
