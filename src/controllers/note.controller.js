import jwt from "jsonwebtoken";
import NoteModel from "../models/note.model.js";
import mongoose from "mongoose";

const createNote = async (req, res) => {
  const { title, description } = req.body;

  // Read and verify the JWT stored in cookies so the note can be linked to the logged-in user.
  const token = req.cookies.token;
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;

  // Validate required fields before creating a note in the database.
  if (!title) return res.status(400).json({ error: "Title is required" });
  if (!description)
    return res.status(400).json({ error: "description is required" });
  if (title.trim().length < 3)
    return res
      .status(400)
      .json({ error: "Title must be atleast 3 charecters long" });
  if (description.trim().length < 10)
    return res
      .status(400)
      .json({ error: "Description must be atleast 10 charecters long" });

  // Create the note document after all input checks have passed.
  const newNote = await NoteModel.create();
  return res
    .status(201)
    .json({ messge: "Note created successfully", note: newNote });
};

const getNotes = async (req, res) => {
  // Verify the cookie token and use the email from it to fetch only this user's notes.
  const token = req.cookies.token;
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;

  const notes = await NoteModel.find({ user: req.user.email });
  if (!notes) return res.status(404).json({ message: "Notes not found" });

  return res.status(200).json({ message: "notes fetched successfully", notes });
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  // Make sure the route parameter is a valid MongoDB ObjectId before querying.
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "please provide valid ID for notes" });

  // Only allow meaningful descriptions to be saved.
  if (!description || description.trim().length < 10)
    return res
      .status(400)
      .json({ error: "description must be atleast 10 charecters long" });

  // Load the existing note, update its description, then save the modified document.
  const note = await NoteModel.findById(id);
  if (!note) return res.status(404).json({ error: "note not found" });

  note.description = description;
  await note.save();

  return res.status(200).json({ message: "note updated successfully", note });
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  // Validate the id first so invalid values do not reach the database query.
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "invalid id " });

  // Confirm the note exists before deleting it.
  const note = await NoteModel.findById(id);
  if (!note) return res.status(404).json({ error: "note not found" });
  
  await NoteModel.findByIdAndDelete(id)
  res.status(200).json({message:"note deleted successfully"})
};

export { createNote, getNotes, updateNote, deleteNote };
