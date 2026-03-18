import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { isDbReady } from "../utils/isDbReady.js";
import { inMemoryStore } from "../utils/inMemoryStore.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (!isDbReady()) {
    const existing = await inMemoryStore.findUserByEmail(email);
    if (existing) return res.status(400).json({ message: "User exists" });

    const user = await inMemoryStore.createUser({ name, email, password });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return res.json({ token, user });
  }

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashed });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token, user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (!isDbReady()) {
    const user = await inMemoryStore.findUserByEmail(email);
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await inMemoryStore.verifyPassword(user, password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return res.json({ token, user });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token, user });
};