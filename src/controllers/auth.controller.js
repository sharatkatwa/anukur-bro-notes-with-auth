import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { name, email } = req.body;

  // Basic request validation before creating a user.
  if (!name) return res.status(400).json({ error: "name is required!" });
  if (!email) return res.status(400).json({ error: "email is required!" });

  // Simple email format check to reject clearly invalid email values.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    res.status(400).json({ error: "Please provide valid email" });

  // Save the new user, then create a JWT containing the user's id and email.
  const user = await UserModel.create({ name, email });
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  // Store the token in a cookie so later requests can identify the logged-in user.
  res.cookie("token", token);

  return res.status(201).json({ message: "user registered successfully", user });
};

const login = async (req, res) => {
  // Login logic can be added here later.
};

export { register, login };
