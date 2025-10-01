import User from "../Model/userSchema.js";
import { createUser } from "../Services/createUser.service.js";
import cookieOptions from "../config/cookie.config.js";
import jsonwebtoken from "jsonwebtoken";

export const registerUser = async(req, res) => {
    try {
    const { email, password, username } = req.body;
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const user = new User({ email, password, username });
    await user.save();

    const token = jsonwebtoken.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    res.cookie("token", token, cookieOptions);
    res.cookie("user", user, cookieOptions);
    res.send(user);
  } catch (err) {
    console.error("Registeration error:", err); // 👈 See exact error in terminal
    res.status(err.status || 500).json({ error: "Server error" });
  }
}


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jsonwebtoken.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    res.cookie("token", token, cookieOptions);
    res.cookie("user", JSON.stringify(user), cookieOptions);
    res.send(user);
  } catch (err) {
    console.error("Login error:", err); // 👈 See exact error in terminal
    res.status(500).json({ error: "Server error" });
  }
};

export const get_current_user = (req, res) => {
    res.status(200).json({user : req.user});
}

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", cookieOptions);
    res.clearCookie("user", cookieOptions);

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

