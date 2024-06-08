import express from "express";
import cors from "cors";
import morgan from "morgan";

// local import files
import userRoutes from "./routers/userRoutes.js";

//initialize the express
const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/api/", userRoutes);
//listners
app.listen(9000, () => {
  console.log("Server is running on PORT: 9000");
});

export default app;
