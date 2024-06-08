import express from "express";
import cors from "cors";
import morgan from "morgan";

// local import files
import userRoutes from "./routers/userRoutes.js";
import employeeRoute from "./routers/employeeRoutes.js";
//initialize the express
const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/api/", userRoutes);
app.use("/api/", employeeRoute);
//listners
app.listen(6000, () => {
  console.log("Server is running on PORT: 6000");
});

export default app;
