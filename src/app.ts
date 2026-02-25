import "dotenv/config";
import express from "express";
import orderRoutes from "./routes/order.routes";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

app.use("/", orderRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
