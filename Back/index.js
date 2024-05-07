import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoute from "./routes/user.route.js";
import { logEndpoint, logSuccess } from "./middlewares/loggers.middleware.js";
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware para parsear el cuerpo de las peticiones
app.use(express.json());

// <--- Habilitamos CORS
app.use(cors());

app.use("/", logEndpoint, logSuccess);
app.use("/", userRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
