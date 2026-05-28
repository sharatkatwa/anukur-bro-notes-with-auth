import { Router } from "express";
import { createNote, deleteNote, getNotes, updateNote } from "../controllers/note.controller.js";
const router = Router()

// Note routes map each HTTP method to its controller function.
router.post("/",createNote)
router.get("/",getNotes)
router.patch("/:id",updateNote)
router.delete("/:id",deleteNote)

export default router
