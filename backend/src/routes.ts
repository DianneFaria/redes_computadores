import { Router } from 'express';
import UserController from './controllers/UserController';

const router = Router();
router.post("/users", UserController.create);
router.put("/users/:id", UserController.update);
router.get("/users", UserController.list);
router.delete("/users/:id", UserController.delete);

export { router };
