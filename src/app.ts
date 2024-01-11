import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./Middlewares/globalErrorHandler";
import notFound from "./Middlewares/notFound";
import router from "./route/route";
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
