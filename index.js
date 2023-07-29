import Express from "express";
import cors from "cors";
import userrouts from './routes/user.routes.js';
import links from './routes/linksrouts.js';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import connectToDb from "./confic/database.js"
const app = Express();
app.use(Express.json());
app.use(cors());
app.use(cookieParser());
connectToDb();
app.use('/', userrouts);
app.use('/links', links);



export default app;