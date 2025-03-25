import { userModel } from "../models/user.model.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  /** Apply Zod validation start */
  const zodSchema = z.object({
    name: z
      .string()
      .min(2, { message: "First name must be more than 3 characters" }),
    email: z.string().email(),
    password: z
      .string()
      .min(5, { message: "password must at least 5 characters" }),
  });
  const validateData = zodSchema.safeParse(req.body);
  console.log(validateData);
  if (!validateData.success) {
    return res.status(404).json({
      success: false,
      message: validateData.error.issues.map((err) => err.message),
    });
  }
  /** Apply Zod validation end */

  try {
    if (!name || !email || !password) {
      return res
        .status(404)
        .json({ message: "Enter All Fields", success: false });
    }
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(404).json({
        message: "User Already Exist",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = await userModel(userData);
    await newUser.save();
    res.status(200).json({
      message: "User Register Successfully",
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error while register user",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const loginZod = z.object({
    email: z.string().email(),
    password: z.string().min(5, { message: "Enter at least 5 characters" }),
  });
  const validateData = loginZod.safeParse(req.body);

  if (!validateData.success) {
    return res.status(404).json({
      success: false,
      message: validateData.error.issues.map((err) => err.message),
    });
  }
  try {
    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "Invalid Credentials", success: false });
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }
    /** compare password start */
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }
    /** compare password end */
    /**Generate JWT Token start */
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    /**Generate JWT Token end */
    res.status(200).json({
      message: "Login Successfully",
      success: true,
      token,
      user: { name: user.name },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Server error", error: error, success: false });
  }
};

export const logout = async (req, res) => {};
