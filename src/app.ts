import express from "express";
import dotenv from "dotenv";
import listEndpoints from "express-list-endpoints";
import router from "./routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);

console.table(
  listEndpoints(app).map(({ methods, path }) => {
    return { methods, path };
  })
);

export default app;
