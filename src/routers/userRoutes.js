import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

// intialize the router object

const routes = Router();

// define router end point with associated controller
routes.post("/user/create", createUser);
routes.get("/user/allusers", getAllUsers);
routes.get("/user/single/:id", getUserById);
routes.put("/user/update/:id", updateUser);
routes.delete("/user/delete/:id", deleteUser);

export default routes;
