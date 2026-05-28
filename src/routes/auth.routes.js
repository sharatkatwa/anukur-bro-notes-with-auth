import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = Router()

// Auth routes handle user registration and login requests.
router.post("/register", register)
router.post("/login", login)

export default router
