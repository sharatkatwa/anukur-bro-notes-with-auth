import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { name, email } = req.body;

  if (!name) return res.status(400).json({ error: "name is required!" });
  if (!email) return res.status(400).json({ error: "email is required!" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    res.status(400).json({ error: "Please provide valid email" });

  const user = await UserModel.create({ name, email });
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  res.cookie("token", token);
  
  res.status(201).json({message:"user registered successfully",user})
};

const login = async (req, res) => {};

export { register, login };
