import jwt from 'jsonwebtoken'
import NoteModel from '../models/note.model.js'

const createNote =async(req,res) =>{
    const {title, description} = req.body
    const token = req.cookies.token
    const user = jwt.verify(token,process.env.JWT_SECRET)
    
    req.user= user
    if(!title)
        res.status(400).json({error:"Title is required"})
    if(!description)
        res.status(400).json({error:"description is required"})
    if(title.trim().length < 3)
        res.status(400).json({error:"Title must be atleast 3 charecters long"})
    if(description.trim().length < 10)
        res.status(400).json({error:"Description must be atleast 10 charecters long"})
    
    const newNote = await NoteModel.create()
    return res.status(201).json({messge: "Note created successfully", note: newNote})
    
}

const getNotes = async(req,res) =>{
    return
}

const updateNote = async(req,res) =>{
    return
}

const deleteNote = async(req,res) =>{
    return 
}

export {createNote,getNotes,updateNote,deleteNote}