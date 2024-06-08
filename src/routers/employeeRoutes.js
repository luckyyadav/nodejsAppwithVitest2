import { Router } from "express";
import {
  createEmployee,
  getEmpById,
  updateEmployee,
  getAllEmployee,
} from "../controllers/employeeController2.js";

// iniliatize the route

const routes = Router();

// add endpoints
routes.post("/employee/create", createEmployee);
routes.get("/employee/allEmps", getAllEmployee);
routes.put("/employee/update/:id", updateEmployee);
routes.get("/employee/single/:id", getEmpById);

export default routes;
