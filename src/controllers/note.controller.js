import jwt from "jsonwebtoken";
import NoteModel from "../models/note.model.js";
import mongoose from "mongoose";

const createNote = async (req, res) => {
  const { title, description } = req.body;
  const token = req.cookies.token;
  const user = jwt.verify(token, process.env.JWT_SECRET);

  req.user = user;
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

  const newNote = await NoteModel.create();
  return res
    .status(201)
    .json({ messge: "Note created successfully", note: newNote });
};

const getNotes = async (req, res) => {
  const token = req.cookies.token;
  const user = jwt.verify(token, process.env.JWT_SECRET);

  req.user = user;
  const notes = await NoteModel.find({ user: req.user.email });
  if (!notes) return res.status(404).json({ message: "Notes not found" });

  return res.status(200).json({ message: "notes fetched successfully", notes });
};

const updateNote = async (req, res) => {
  const {id} = req.params
  const {description} = req.body
  
  if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({error:"please provide valid ID for notes"})
  if(!description || description.trim().length < 10)
    return res.status(400).json({error: 'description must be atleast 10 charecters long'})
    
    const note =await NoteModel.findById(id)
    if(!note)
        return res.status(404).json({error:'note not found'})
    
    note.description = description
    await note.save()
    
    return res.status(200).json({message:"note updated successfully",note})
};

const deleteNote = async (req, res) => {
  return;
};

export { createNote, getNotes, updateNote, deleteNote };
