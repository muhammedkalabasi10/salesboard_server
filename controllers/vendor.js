import VendorModel from "../models/VendorModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const signIn = async (req, res) => {
  const { name } = req.body;
  try{
      if ( !name )
          return res
            .status(400)
            .json({ message: "Name is required." });
      const existingVendor = await VendorModel.findOne({ name });
      if( !existingVendor )
          return res.status(404).json({ message: "Vendor doesn't exist" });
      const accessToken = jwt.sign({ vendor: existingVendor }, ACCESS_TOKEN_SECRET, {
          expiresIn: "30s",
        });
        const refreshToken = jwt.sign({ vendor: name }, REFRESH_TOKEN_SECRET, {
          expiresIn: "7d",
        });
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ accessToken });
  } catch (err) {
      res.status(404).json({ message: err.message });
  }
};

export const refresh = async (req, res) => {
  const cookies = await req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorizedd" });
  const refreshToken = await cookies.jwt;
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    const foundVendor = await VendorModel.findOne({ name: decoded.vendor }).exec();
    if (!foundVendor) return res.status(401).json({ message: "Unauthorized vendor", error: "Vendor not found" });
    const accessToken = jwt.sign({ vendor: foundVendor }, ACCESS_TOKEN_SECRET, {
      expiresIn: "30s",
    });
    res.json({ accessToken });
  });
};

export const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};