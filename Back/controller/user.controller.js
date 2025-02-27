import { userModel } from "../models/user.model.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import bcript from "bcryptjs";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.find(email);
    // console.log("linea 10", user);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const passwordEqual = bcript.compareSync(password, user.password);
    if (!passwordEqual) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // creación del payload
    const payload = {
      email,
    };
    // creación del token
    const token = jwt.sign(payload, process.env.SECRET);
    return res.status(200).json({
      message: "Login successfully",
      token,
      email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const register = async (req, res) => {
  const { email, password, rol, lenguage } = req.body;
  try {
    const alreadyUser = await userModel.find(email);
    if (alreadyUser) {
      console.log("linea 33 usuario ya existe");
      throw { code: "23505", message: "User already exists" };
    }
    await userModel.create({
      email,
      password: bcript.hashSync(password, 10),
      rol,
      lenguage,
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    // recuerda que estos códigos de error los puedes modularizar como lo vimos en todo.controller.js
    if (error.code === "23505") {
      return res.status(400).json({ message: "User already exists" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUsers = async (req, res) => {
  const { email } = req.user;
  try {
    const { rol, lenguage, id } = await userModel.find(email);
    return res.status(200).json([{ rol, lenguage, id, email }]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const userController = {
  login,
  register,
  getUsers,
};
