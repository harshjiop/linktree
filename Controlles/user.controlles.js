import User from "../models/user.models.js";
import bcrypt from "bcrypt";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
};

const home = async (req, res) => {
  res.json({ Type: "get" });
};
const register = async (req, res) => {
  try {
    const { FullName, email, password } = req.body;
    // console.log(FullName, email, password)

    if (!FullName || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const UserExists = await User.findOne({ email });
    if (UserExists) {
      return res
        .status(400)
        .json({ msg: "This email Already Exists pls login" });
    }

    const user = await User.create({
      FullName,
      email,
      password,
    });

    await user.save();
    const token = await user.ganarateJWTToken();
    console.log("register jwttoken", token);

    res.cookie("token", token, cookieOptions);

    if (!user) {
      res.status(400).json({ msg: "Some Thing went Wrong! plse try again" });
    }

    res.status(201).json({
      success: true,
      message: "User created Successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "created account err",
      message: error.message,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const UserExists = await User.findOne({ email }).select("+password");
    const commperpassword = await bcrypt.compare(password, UserExists.password);
    
    if (!UserExists) {
      return res.status(400).json({
        msg: "This email and Password dosenot Exists pls create account",
      });
    }
    const token = await UserExists.ganarateJWTToken();
    console.log("login jwttoken", token);
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "login suceesfull",
      data: UserExists,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "login err",
      message: error.message,
    });
  }
};
const logout = async (req, res) => {
  res.cookie("token", null, {
    maxAge: 0,
    httpOnly: true,
    secure: true,
  });
  res.status(201).json({
    success: true,
    message: "User Logout Successfully",
  });
};

const myprofile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log("userid",userId);
    const user = await User.findById(userId);
    res.status(201).json({
      success: true,
      message: "User data found",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "user deteles not found",
    });
  }
};

export { home, register, login, logout, myprofile };
