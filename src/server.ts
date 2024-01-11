import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";
import config from "./config";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.dataBaseURL as string);
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();

process.on("unhandledRejection", () => {
  console.log(`UncaughtException server down ...!`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on("uncaughtException", () => {
  console.log(`UncaughtException server down ...!`);
  process.exit(1);
});
