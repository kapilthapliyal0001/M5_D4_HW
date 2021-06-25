// Section for imports
import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import {join, dirname} from "path";
import filesRouter from "./services/files/index.js";
import {fileURLToPath} from "url";
import {
  catchErrorMiddleware,
  badRequestMiddleware,
  notFoundMiddleware,
} from "./errorMiddlewares.js";

import blogRouter from "./blogPosts/index.js";

const publicFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../public"
);
const server = express();
const PORT = 3001;

//  section for the Routes and global middlewares
server.use(express.static(publicFolderPath));

server.use(cors());

server.use(express.json());

server.use("/files", filesRouter);
server.use("/posts", blogRouter);

//Section for the error middlewares
server.use(notFoundMiddleware);
server.use(badRequestMiddleware);
server.use(catchErrorMiddleware);

//  This is the last section

console.table(listEndpoints(server));

server.listen(PORT, () => {
  console.log("✅ Server is Running! on Port: ", PORT);
  console.log(publicFolderPath);
});

server.on("error", (error) =>
  console.log("❌ Server is NOT Running! on Port: ", PORT)
);
