import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./app";
import dbOptions from "./database/ormconfigs";

const PORT = process.env.PORT ?? "3000";

createConnection(dbOptions)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  })
  .catch((error: any) => console.log(error));
