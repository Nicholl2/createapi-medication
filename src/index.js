import express from "express";
import dotenv from "dotenv";
import medicationRoutes from "./routes/medicationRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/suppliers", supplierRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/reports", reportRoutes);

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`✅ Server running locally on http://localhost:${port}`);
  });
}

export default app;
